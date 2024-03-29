import argparse
import warnings
import random
import logging

from pytorch_transformers import OpenAIGPTLMHeadModel, OpenAIGPTTokenizer, GPT2LMHeadModel, GPT2Tokenizer
import torch
import torch.nn.functional as F

from blackmirror.models.Gentext.train import SPECIAL_TOKENS, build_input_from_segments, add_special_tokens_
from blackmirror.models.Gentext.utils import download_pretrained_model
from blackmirror.utils import search_path

def top_filtering(logits, top_k=0., top_p=0.9, threshold=-float('Inf'), filter_value=-float('Inf')):
    '''
    Filter a distribution of logits using top-k, top-p (nucleus) and/or threshold filtering
    Args:
        logits: logits distribution shape (vocabulary size)
        top_k: <=0: no filtering, >0: keep only top k tokens with highest probability.
        top_p: <=0.0: no filtering, >0.0: keep only a subset S of candidates, where S is the smallest subset
            whose total probability mass is greater than or equal to the threshold top_p.
            In practice, we select the highest probability tokens whose cumulative probability mass exceeds
            the threshold top_p.
        threshold: a minimal threshold to keep logits
    '''
    assert logits.dim() == 1  # Only work for batch size 1 for now - could update but it would obfuscate a bit the code
    top_k = min(top_k, logits.size(-1))
    if top_k > 0:
        # Remove all tokens with a probability less than the last token in the top-k tokens
        indices_to_remove = logits < torch.topk(logits, top_k)[0][..., -1, None]
        logits[indices_to_remove] = filter_value

    if top_p > 0.0:
        # Compute cumulative probabilities of sorted tokens
        sorted_logits, sorted_indices = torch.sort(logits, descending=True)
        cumulative_probabilities = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)

        # Remove tokens with cumulative probability above the threshold
        sorted_indices_to_remove = cumulative_probabilities > top_p
        # Shift the indices to the right to keep also the first token above the threshold
        sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[..., :-1].clone()
        sorted_indices_to_remove[..., 0] = 0

        # Back to unsorted indices and set them to -infinity
        indices_to_remove = sorted_indices[sorted_indices_to_remove]
        logits[indices_to_remove] = filter_value

    indices_to_remove = logits < threshold
    logits[indices_to_remove] = filter_value

    return logits

def sample_sequence(personality, history, tokenizer, model, min_length=1, max_length=20, temperature=0.7, top_k=0, top_p=0.9, no_sample=False, current_output=None):

    special_tokens_ids = tokenizer.convert_tokens_to_ids(SPECIAL_TOKENS)

    if current_output is None:
        current_output = []

    for i in range(max_length):
        instance = build_input_from_segments(
            personality,
            history,
            current_output,
            tokenizer,
            with_eos=False
        )
        input_ids = torch.tensor(instance['input_ids'], device='cpu').unsqueeze(0)
        token_type_ids = torch.tensor(instance['token_type_ids'], device='cpu').unsqueeze(0)

        logits = model(input_ids, token_type_ids=token_type_ids)
        if isinstance(logits, tuple):  # for gpt2 and maybe others
            logits = logits[0]
        logits = logits[0, -1, :] / temperature
        logits = top_filtering(logits, top_k=top_k, top_p=top_p)
        probs = F.softmax(logits, dim=-1)

        prev = torch.topk(probs, 1)[1] if no_sample else torch.multinomial(probs, 1)
        if i < min_length and prev.item() in special_tokens_ids:
            while prev.item() in special_tokens_ids:
                if probs.max().item() == 1:
                    warnings.warn('Warning: model generating special token with probability 1.')
                    break  # avoid infinitely looping over special token
                prev = torch.multinomial(probs, num_samples=1)
        if prev.item() in special_tokens_ids:
            break
        current_output.append(prev.item())
    return current_output

def response_sampler(personality=None, model='openai-gpt', model_checkpoint=None, max_history=5, seed=0, **kwargs):
    # Find model
    model_checkpoint = model_checkpoint or search_path('**/gentext_cache/model')
    if model_checkpoint is None:
        warning.warn('Cache path not found. Downloading model...')
        if model == 'gpt2':
            raise ValueError('Interacting with GPT2 requires passing a finetuned model_checkpoint')
        else:
            model_checkpoint = download_pretrained_model()

    # Seed RNGs
    if seed != 0:
        random.seed(seed)
        torch.random.manual_seed(seed)
        torch.cuda.manual_seed(seed)

    tokenizer_class, model_class = (GPT2Tokenizer, GPT2LMHeadModel) if model == 'gpt2' else (OpenAIGPTTokenizer, OpenAIGPTLMHeadModel)
    tokenizer = tokenizer_class.from_pretrained(model_checkpoint)
    model = model_class.from_pretrained(model_checkpoint)
    model.to('cpu')
    add_special_tokens_(model, tokenizer)

    # Bening personality as default
    if personality is None:
        personality = ['i like programming', 'i think software is cool']
    # Encode personality
    personality = [ tokenizer.encode(item + ' .') for item in personality ]

    history_persistent = []
    def sampler(text, hist=None):
        history = history_persistent
        if hist is not None:
            history = []
            for item in hist:
                history.append(tokenizer.encode(item))
        history.append(tokenizer.encode(text))
        with torch.no_grad():
            out_ids = sample_sequence(
                personality,
                history,
                tokenizer,
                model,
                **kwargs
            )
            history.append(out_ids)
            history = history[-(2*max_history+1):]
            out_text = tokenizer.decode(out_ids, skip_special_tokens=True)
            return out_text
    return sampler

if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--dataset_path', type=str, default='', help='Path or url of the dataset. If empty download from S3.')
    parser.add_argument('--dataset_cache', type=str, default='./dataset_cache', help='Path or url of the dataset cache')
    parser.add_argument('--model', type=str, default='openai-gpt', help='Model type (openai-gpt or gpt2)', choices=['openai-gpt', 'gpt2'])
    parser.add_argument('--model_checkpoint', type=str, default='', help='Path, url or short name of the model')
    parser.add_argument('--max_history', type=int, default=2, help='Number of previous utterances to keep in history')
    parser.add_argument('--device', type=str, default='cuda' if torch.cuda.is_available() else 'cpu', help='Device (cuda or cpu)')
    parser.add_argument('--no_sample', action='store_true', help='Set to use greedy decoding instead of sampling')
    parser.add_argument('--max_length', type=int, default=20, help='Maximum length of the output utterances')
    parser.add_argument('--min_length', type=int, default=1, help='Minimum length of the output utterances')
    parser.add_argument('--seed', type=int, default=0, help='Seed')
    parser.add_argument('--temperature', type=int, default=0.7, help='Sampling softmax temperature')
    parser.add_argument('--top_k', type=int, default=0, help='Filter top-k tokens before sampling (<=0: no filtering)')
    parser.add_argument('--top_p', type=float, default=0.9, help='Nucleus filtering (top-p) before sampling (<=0.0: no filtering)')
    args = parser.parse_args()

    # TODO: Interactive session
