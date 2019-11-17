# RNN model for sentence binary classification
import warnings

with warnings.catch_warnings():
    warnings.simplefilter('ignore', category=DeprecationWarning)
    warnings.simplefilter('ignore', category=FutureWarning)
    warnings.simplefilter('ignore', category=RuntimeWarning)
    from sklearn.model_selection import train_test_split
    import tensorflow as tf
    import numpy as np
    import functools
    import keras
    import re

if tf.test.is_gpu_available():
    rnn = tf.keras.layers.CuDNNGRU
else:
    rnn = functools.partial(
        tf.keras.layers.GRU,
        recurrent_activation='sigmoid'
    )

# clf.summary()
# clf.compile(optimizer=tf.keras.optimizers.Adam(lr=1e-3), loss='binary_crossentropy', metrics=['accuracy'])
# history = clf.fit(X_train, Y_train, epochs=2, batch_size=batch_size, validation_split=0.05)
def create_classifier(vocab_size, batch_size, rnn_units=64, embedding_dim=128):
    clf = tf.keras.Sequential([
        tf.keras.layers.Embedding(
            vocab_size,
            embedding_dim,
            #input_length=128,
            #batch_input_shape=[batch_size, None]
        ),
        rnn(rnn_units,
            return_sequences=False,
            stateful=False,
            recurrent_initializer='glorot_uniform',
        ),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    return clf
