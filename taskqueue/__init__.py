import os
import rpqueue

import bm_redis
from utils import get_logger

bmqueue = rpqueue.new_rpqueue("bmqueue", "bmq:")
bmqueue.NEW_CLIENT = bmqueue.MED_CLIENT = True

bmqueue.set_redis_connection(bm_redis.get_ephemeral())
bmqueue.log_handler = get_logger("bm-rpqueue")
