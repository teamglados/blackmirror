import pathlib
import random
import os

def search_path(pattern, max_depth=5):
    for start_path in ['.'] + ['/'.join(['..']*i) for i in range(1, max_depth)]:
        try:
            return os.path.abspath(str(sorted(pathlib.Path(start_path).glob(pattern))[0]))
        except:
            continue

def sample_random_path(abspath):
    if not os.path.isdir(abspath):
        raise RuntimeError('input path must be a directory')
    return os.path.join(abspath, random.choice(os.listdir(abspath)))
