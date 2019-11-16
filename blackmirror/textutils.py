import pandas as pd
import numpy as np
import re

# All input text should pass through this function, where we remove all unsupported
# characters to ensure vocab compability.
def clean_text(text):
    # Remove extra chars
    clean = re.sub(r'[^A-Za-z\s!?\:\/\',\.\-]+', '', text)
    # Remove extra whitespace
    clean = re.sub(r'(\s)\1{1,}', r'\1', clean)
    return clean

# Pad text to length
def pad_text(text, to_length=128, pad_char=' '):
    return text[:to_length] + pad_char * max(0, (to_length - len(text)))

# Tokenizes text using a vocabulary to obtain numerical representation
# of the text
def tokenize_text(text, *tokenizers):
    return [ tokenizers[0][c] for c in text ]

# Creates vocab tokenizers
def create_tokenizers(text):
    vocab = sorted(set(text))
    char2idx = {u:i for i, u in enumerate(vocab)}
    idx2char = np.asarray(vocab)
    return char2idx, idx2char
