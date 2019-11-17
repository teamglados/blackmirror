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

UPLOAD_PATH = os.environ.get('UPLOAD_PATH', '/temp')
SOURCE_TAUNTS_PATH = search_path('**/template_cache/source_text/taunts.txt')
SOURCE_INSULTS_PATH = search_path('**/template_cache/source_text/insults.txt')
SOURCE_KEYWORD_PATH = search_path('**/template_cache/source_text/keywords.txt')
SOURCE_MEME_PATH = search_path('**/template_cache/meme')

GENERATED_GENERIC_PATH = search_path('**/template_cache/generated/generic.txt')
GENERATED_GENERIC_COMMENTS_PATH = search_path('**/template_cache/generated/generic_comments.txt')
GENERATED_MALICIOUS_PATH = search_path('**/template_cache/generated/malicious.txt')
GENERATED_MALICIOUS_COMMENTS_PATH = search_path('**/template_cache/generated/malicious_comments.txt')

PERSONAS_STATIC = create_personas(100)
PERSONAS_ACTIVE = create_personas(10)
#PERSONAS_SAMPLERS = [ response_sampler(persona[0]) for persona in PERSONAS_ACTIVE ]
categories = ast.literal_eval(open(SOURCE_KEYWORD_PATH).read().strip())

def create_timestamp():
    return int(time.time() * 1000.)

def create_comment_context(persona, text, image='', tdiff=0):
    return {
        'user': {
            'first_name': persona[-1]['GivenName'],
            'last_name': persona[-1]['Surname'],
            'image': persona[1]
        },
        'content': {
            'text:': text,
            'image': image,
            'like_count': random.randint(0, 10),
            'timestamp_ms_created': create_timestamp() - tdiff,
        }
    }

def create_post_context(user_context, persona, text, image=''):
    return {
        'user': copy.deepcopy(user_context),
        'post': {
            'user': {
                'first_name': persona[-1]['GivenName'],
                'last_name': persona[-1]['Surname'],
                'image': persona[1]
            },
            'content': {
                'text:': text,
                'image': image,
                'like_count': random.randint(0, 27),
                'timestamp_ms_created': create_timestamp(),
            }
        },
        'comments': []
    }

def generate_malicious_topic(user_context):
    pass

def generate_targeted_comment(user_context, topic_idx=None):
    # TODO: This can be taunt
    # TODO: This can be insult
    # TODO: This can be comment on malicious topic
    comment = None

    if topic_idx is not None:
        pass
    pass

def generate_generic_post(user_context, count=1):

    source = open(GENERATED_GENERIC_PATH).read().splitlines()
    source_comment = open(GENERATED_GENERIC_COMMENTS_PATH).read().splitlines()
    persona = random.choice(PERSONAS_ACTIVE)
    idx = random.randint(0, len(source))

    post_context = create_post_context(
        user_context,
        persona,
        text=source[idx],
    )
    post_context['comments'] = [ create_comment_context(
        random.choice(PERSONAS_STATIC),
        text=text,
        tdiff=i*30000
        ) for i, text in enumerate(source_comment[idx].split(';'))
    ][::-1]
    return post_context

def generate_targeted_posts(user_context, count=1):

    source = open(GENERATED_MALICIOUS_PATH).read().splitlines()
    source_comment = open(GENERATED_MALICIOUS_COMMENTS_PATH).read().splitlines()
    persona = random.choice(PERSONAS_ACTIVE)
    idx = random.randint(0, len(source))

    # Create meme post with 25% chance
    if np.random.uniform(0, 1) < 0.25:
        filename = str(create_timestamp()) + '.jpg'
        filepath = os.path.join(UPLOAD_PATH, filename)
        swap_face(user_context['user']['image'],
            sample_random_path(SOURCE_MEME_PATH),
            filepath
        )
        post_context = create_post_context(
            user_context,
            text=generate_malicious_topic(),
            image=filepath
        )
        comment_texts = [ generate_source_comment(user_context) for i in range(1, random.randint(1, 10)) ]

    # Generate insulting post
    else:
        post_context = create_post_context(
            user_context,
            text=generate_insults(user_context),
        )
        comment_texts = [ generate_source_comment(user_context) for i in range(1, random.randint(1, 10)) ]

    for ctext in comment_texts:
        # TODO: select persona
        persona = None
        comment_context = create_comment_context(persona, ctext)
        post_context['comments'].append(comment_context)

    return post_context

def generate_replies(post_context, count=1, p_malicious=0.5, p_mock=0.5, p_taunt=0.5):
    history = [ comment['content']['text'] for comment in post_context['comments'] ]

    if np.random.uniform(0, 1) < p_mock:
        pass
    elif np.random.uniform(0, 1) < p_taunt:
        pass
    if np.random.uniform(0, 1) < p_malicious:
        pass
