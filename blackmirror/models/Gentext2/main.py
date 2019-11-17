import warnings

with warnings.catch_warnings():
    warnings.simplefilter('ignore', category=DeprecationWarning)
    warnings.simplefilter('ignore', category=FutureWarning)
    warnings.simplefilter('ignore', category=RuntimeWarning)
    from sklearn.model_selection import train_test_split
    import tensorflow as tf
    import numpy as np
    import json
    import os

import blackmirror.models.Gentext2.encoder as encoder
import blackmirror.models.Gentext2.sample as sample
import blackmirror.models.Gentext2.model as model
from blackmirror.utils import search_path

models_dir = search_path('**/gentext2_cache/model')

def textgen_sampler(
    models_dir=models_dir,
    model_name='124M',
    seed=None,
    nsamples=1,
    batch_size=1,
    length=None,
    temperature=1,
    top_k=0,
    top_p=1):

    if batch_size is None:
        batch_size = 1
    assert nsamples % batch_size == 0

    enc = encoder.get_encoder(model_name, models_dir)
    hparams = model.default_hparams()
    with open(os.path.join(models_dir, model_name, 'hparams.json')) as f:
        hparams.override_from_dict(json.load(f))

    if length is None:
        length = hparams.n_ctx // 2
    elif length > hparams.n_ctx:
        raise ValueError("Can't get samples longer than window size: %s" % hparams.n_ctx)

    sess = tf.Session(graph=tf.Graph())
    sess.__enter__()
    context = tf.placeholder(tf.int32, [batch_size, None])
    np.random.seed(seed)
    tf.set_random_seed(seed)
    output = sample.sample_sequence(
        hparams=hparams, length=length,
        context=context,
        batch_size=batch_size,
        temperature=temperature, top_k=top_k
    )
    saver = tf.train.Saver()
    ckpt = tf.train.latest_checkpoint(os.path.join(models_dir, model_name))
    saver.restore(sess, ckpt)

    def sampler(text):
        context_tokens = enc.encode(text)
        generated = 0
        for _ in range(nsamples // batch_size):
            out = sess.run(output, feed_dict={
                context: [context_tokens for _ in range(batch_size)]
            })[:, len(context_tokens):]
            results = []
            for i in range(batch_size):
                generated += 1
                text = enc.decode(out[i])
                return text
    return sampler
