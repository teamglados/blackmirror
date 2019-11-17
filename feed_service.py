
import random
from tests import BMTestCase
from feed_context import FeedContext
from utils import get_logger
from dal import user_dal

logger = get_logger("feedservice")

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

def init_feed(user_id):
    logger.info(f"Starting to create the feed for {user_id}")
    user_context = user_dal.get(user_id)
    generic_posts = generate_generic_post(user_context, count=5)
    targeted_posts = generate_targeted_posts(user_context, count=4)

    posts = generic_posts + targeted_posts
    random.shuffle(posts)
    logger.info(f"about to add {len(posts)} for {user_id}")
    for post in posts:
        fc = FeedContext(user_id)
        fc.upsert(post)