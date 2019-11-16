import os
import json
import logging


def get_logger(name, debug_level=True):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG if debug_level else logging.INFO)
    if not logger.hasHandlers():
        sh = logging.StreamHandler()
        sh.setFormatter(
            logging.Formatter(
                "%(asctime)s.%(msecs)03d %(levelname)s {%(module)s} [%(funcName)s] %(message)s",
                datefmt="%Y-%m-%d,%H:%M:%S",
            )
        )
        logger.addHandler(sh)
    return logger


flatten = lambda l: [item for sublist in l for item in sublist]

def get_root_path():
    return os.path.dirname(os.path.abspath(__file__))

def to_dict(row):
    row_d = dict(row)
    if "context" in row_d and row_d["context"]:
        row_d["context"] = json.loads(row_d["context"])
    return row_d
