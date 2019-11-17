
import random
from tests import BMTestCase
from feed_context import FeedContext
from utils import get_logger
from dal import user_dal
from dal import feed_dal

from blackmirror.generate import generate_generic_posts, generate_targeted_posts, generate_reply

logger = get_logger("feedservice")


def init_feed(user_id):
    logger.info(f"Starting to create the feed for {user_id}")
    user_context = user_dal.get(user_id)
    generic_posts = generate_generic_posts(user_context, count=5)
    targeted_posts = generate_targeted_posts(user_context, count=5)

    posts = generic_posts + targeted_posts
    random.shuffle(posts)
    logger.info(f"about to add {len(posts)} for {user_id}")
    for post in posts:
        fc = FeedContext(user_id)
        fc.upsert(post)

def get_reply(feed_id, user_id):
    context_holder = feed_dal.get(feed_id)
    comment = generate_reply(context_holder["context"])

    context_holder["context"]["comments"].append(comment)
    fc = FeedContext(user_id)
    fc.upsert(context_holder["context"])
