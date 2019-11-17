import os
import random
import feed_service
import message_service
from taskqueue import bmqueue
from utils import get_logger
from dal import user_dal
from feed_context import FeedContext
from tests import BMTestCase

N_ATTEMPTS = 5
VIS_TIMEOUT = 60
logger = get_logger("bmqueue")

def _generate_post(user, count=1):
    t = BMTestCase()

    posts = []
    for _ in range(count):
        posts.append(t._create_post(user))
    return posts

def generate_generic_post(user, count=1):
    return _generate_post(user, count=count)

def generate_targeted_posts(user, count=1):
    return _generate_post(user, count=count)

@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def create_feed(user_id: str, **kwargs):
    user_context = user_dal.get(user_id)
    generic_posts = generate_generic_post(user_context, count=5)
    targeted_posts = generate_targeted_posts(user_context, count=4)

    posts = generic_posts + targeted_posts
    random.shuffle(posts)
    logger.info(f"about to add {len(posts)} for {user_id}")
    for post in posts:
        fc = FeedContext(user_id)
        fc.upsert(post)


@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def create_static_post(user_id: str, **kwarg):

    pass

@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def create_meme_post(user_id: str, **kwarg):
    pass


@bmqueue.task(vis_timeout=VIS_TIMEOUT, attempts=N_ATTEMPTS)
def create_messages(user_id: str, **kwargs):
    return message_service.create_messages(user_id)
