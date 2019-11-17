import numpy as np
import random
import time
import copy
import ast

from blackmirror.models.Gentext.main import response_sampler
from blackmirror.models.Gentext2.main import textgen_sampler
from blackmirror.models.FaceSwap.main import swap_face
from blackmirror.templates import *
from blackmirror.mocks import *

UPLOAD_PATH = os.environ.get('UPLOAD_PATH')
SOURCE_TAUNTS_PATH = search_path('**/template_cache/source_text/taunts.txt')
SOURCE_INSULTS_PATH = search_path('**/template_cache/source_text/insults.txt')
SOURCE_KEYWORD_PATH = search_path('**/template_cache/source_text/keywords.txt')
SOURCE_MEME_PATH = search_path('**/template_cache/meme')

CATEGORIES = ast.literal_eval(open(SOURCE_KEYWORD_PATH).read().strip())
PERSONAS_STATIC = create_personas(100)
PERSONAS_ACTIVE = [ response_sampler(persona[0]) for persona in create_personas(10) ]

def create_timestamp():
    return int(time.time() * 1000.)

def create_comment_context(persona):
    return {
        'user': {
            'first_name': '',
            'last_name': '',
            'image': ''
        },
        'content': {
            'text:': '',
            'image': '',
            'like_count': random.randint(0, 10),
            'timestamp_ms_created': create_timestamp(),
        }
    }

def create_post_context(user_context, persona):
    return {
        'user': copy.deepcopy(user_context),
        'post': {
            'user': {
                'first_name': '',
                'last_name': '',
                'image': ''
            },
            'content': {
                'text:': '',
                'image': '',
                'like_count': random.randint(0, 27),
                'timestamp_ms_created': create_timestamp(),
            }
        },
        'comments': []
    }

def source_random(path, count=1):
    source = open(PATH).read().splitlines()
    return [ random.choice(source) for i in range(count) ]

def generate_generic_post(count=1):
    # TODO: Sample from pre-generated generic posts, with comments
    pass

def generate_targeted_posts(user_context, count=1):

    # Create meme post
    if np.random.uniform(0, 1) < 0.25:
        filename = str(create_timestamp()) + '.jpg'
        filepath = os.path.join(UPLOAD_PATH, filename)
        swap_face(
            user_context['user']['image'],
            sample_random_path(SOURCE_MEME_PATH),
            filepath
        )
        # TODO: Create comments
        # TODO: Create post

    # TODO: Sample pre-generated to create insulting post
    pass

def generate_replies(post_context, count=1, p_malicious=0.75, p_mock=0.5, p_taunt=0.5):
    # TODO: Find identities from context
    # TODO: Select insult randomly p_malicious
    # TODO: Sample from mock replies p_mock
    pass

def generate_taunts(count=1):
    return source_random(SOURCE_TAUNTS_PATH, count)

def generate_fake_profile(user_context, generic_post_count=1, targeted_post_count=1):
    # TODO: Generate generic posts
    # TODO: Generate targeted posts
    pass
