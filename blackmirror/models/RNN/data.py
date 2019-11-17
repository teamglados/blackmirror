from blackmirror.textutils import *

#'\n'.join(df[df.insult == 1].comment_text)
def build_sentences(text, max_length=128, min_words=1):
    sentences = clean_text(text).split('\n')
    padded = []
    for s in filter(lambda x: len(x.split(' ')) > min_words and len(x) < max_length, sentences):
        padded.append(pad_text(s, max_length))
    return padded

# tokenizers = create_tokenizers(' '.join(padded))
def build_sentence_features(padded_sentences, *tokenizers):
    tokenized = []
    for s in padded_sentences:
        tokenized.append(tokenize_text(s, *tokenizers))
    return np.asarray(tokenized)
