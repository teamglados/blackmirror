
import os
import random
import time
import pandas as pd
from tests import BMTestCase
from feed_context import FeedContext
from utils import get_logger
from dal import user_dal

with open("templates/generic.txt", "r") as fp:
    generic = fp.readlines()

with open("templates/generic_comments.txt", "r") as fp:
    generic_comments = fp.readlines()

identities = pd.read_csv("templates/identities.csv")

logger = get_logger("feedservice")

def _create_content(user, text, image=None):
    time.sleep(0.2)
    return {
        "user": user,
        "content": {
            "text": text,
            "image": image,
            "like_count": random.randint(0, 10),
            "timestamp_ms_created": int(round(time.time() * 1000)),
        }
    }

def get_random_text(text_list):
    return random.choice(text_list)

def _create_post(user, comments):
    text = get_random_text(generic)
    return {
        "user": user,
        "post": _create_content(user, text),
        "comments": comments,
    }

def _get_random_user():
    user = identities.sample(1).to_dict("records")[0]
    if user["gender"] == "male":
        files = os.listdir("templates/images/male")
        index = random.randrange(0, len(files))
        user["image"] = f"uploads/{files[index]}"
    else:
        files = os.listdir("templates/images/female")
        index = random.randrange(0, len(files))
        user["image"] = f"uploads/{files[index]}"
    return user

def create_comment():
    comment_user = _get_random_user()
    text = get_random_text(generic_comments)
    return _create_content(comment_user, text)

def _generate_post(user, count=1):
    posts = []
    for _ in range(count):
        user = _get_random_user()
        comments = []
        if random.random() < 0.25:
            comments = [create_comment()]
        posts.append(_create_post(user, comments))
    return posts

def generate_generic_posts(user, count=1):
    return _generate_post(user, count=count)

def generate_targeted_posts(user, count=1):
    return _generate_post(user, count=count)

def init_feed(user_id):
    logger.info(f"Starting to create the feed for {user_id}")
    user_context = user_dal.get(user_id)
    posts = generate_generic_posts(user_context, count=10)
    random.shuffle(posts)
    logger.info(f"about to add {len(posts)} for {user_id}")
    for post in posts:
        fc = FeedContext(user_id)
        fc.upsert(post)
