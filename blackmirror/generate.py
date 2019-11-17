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

UPLOAD_PATH = os.environ.get('UPLOAD_PATH', '/Users/andreas/Desktop')
SOURCE_TAUNTS_PATH = search_path('**/template_cache/source_text/taunts.txt')
SOURCE_INSULTS_PATH = search_path('**/template_cache/source_text/insults.txt')
SOURCE_KEYWORD_PATH = search_path('**/template_cache/source_text/keywords.txt')
SOURCE_MEME_PATH = search_path('**/template_cache/meme')

GENERATED_GENERIC_PATH = search_path('**/template_cache/generated/generic.txt')
GENERATED_GENERIC_COMMENTS_PATH = search_path('**/template_cache/generated/generic_comments.txt')
GENERATED_MALICIOUS_PATH = search_path('**/template_cache/generated/malicious.txt')
GENERATED_MALICIOUS_COMMENTS_PATH = search_path('**/template_cache/generated/malicious_comments.txt')

PERSONAS_STATIC = create_personas(100)
PERSONAS_ACTIVE = create_personas(2)
PERSONAS_SAMPLERS = [ response_sampler(persona[0]) for persona in PERSONAS_ACTIVE ]
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
            'text': text,
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

def generate_malicious_topic(user_context, topic_idx, keyword=''):
    topic = open(GENERATED_MALICIOUS_PATH).read().splitlines()[topic_idx]
    topic = topic.replace('<PERSON>', user_context['first_name'])
    if keyword:
        topic = topic.replace('<KEYWORD>', keyword)
    return topic

def generate_targeted_comment(user_context, topic_idx=None, keyword=''):
    taunt = random.choice(open(SOURCE_TAUNTS_PATH).read().splitlines())
    insult = random.choice(open(SOURCE_INSULTS_PATH).read().splitlines())
    source_comments = open(GENERATED_MALICIOUS_COMMENTS_PATH).read().splitlines()

    comment = taunt
    if np.random.uniform(0, 1) < 0.75:
        comment = insult

    if topic_idx is not None and np.random.uniform(0, 1) < 0.75:
        comment = random.choice(source_comments[topic_idx].split(';'))

    comment = comment.replace('<PERSON>', user_context['first_name'])
    if keyword:
        comment = comment.replace('<KEYWORD>', keyword)
    return comment

def generate_generic_post(user_context):
    source = open(GENERATED_GENERIC_PATH).read().splitlines()
    source_comment = open(GENERATED_GENERIC_COMMENTS_PATH).read().splitlines()
    persona = random.choice(PERSONAS_STATIC)
    idx = random.randint(0, len(source)-1)

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

def generate_targeted_post(user_context):
    source = open(GENERATED_MALICIOUS_PATH).read().splitlines()
    persona = random.choice(PERSONAS_ACTIVE)
    idx = random.randint(0, len(source)-1)

    # TODO: Select keyword
    keyword = 'TEST KEYWORD'

    # Create meme post with 25% chance
    if np.random.uniform(0, 1) < 0.25:
        filename = str(create_timestamp()) + '.jpg'
        filepath = os.path.join(UPLOAD_PATH, filename)
        memepath = sample_random_path(SOURCE_MEME_PATH)
        print(user_context['image'], filepath, memepath)

        swap_face(user_context['image'], memepath, filepath)
        post_context = create_post_context(
            user_context,
            persona=persona,
            text=generate_targeted_comment(user_context, topic_idx=None),
            image=filepath
        )
        comment_texts = [ generate_targeted_comment(user_context, topic_idx=None, keyword=keyword) for i in range(random.randint(1, 3)) ]

    # Generate insulting post
    else:
        post_context = create_post_context(
            user_context,
            persona=persona,
            text=generate_malicious_topic(user_context, topic_idx=idx)
        )
        comment_texts = [ generate_targeted_comment(user_context, topic_idx=idx, keyword=keyword) for i in range(random.randint(1, 3)) ]

    for i, ctext in enumerate(comment_texts):
        persona = random.choice(PERSONAS_ACTIVE)
        comment_context = create_comment_context(persona, ctext, tdiff=i*30000)
        post_context['comments'].append(comment_context)

    return post_context

def generate_reply(post_context):
    history = [ comment['content']['text'] for comment in post_context['comments'] ]
    persona_idx = random.randint(0, len(PERSONAS_ACTIVE)-1)
    persona = PERSONAS_ACTIVE[persona_idx]

    # Simple taunt
    text = random.choice(open(SOURCE_TAUNTS_PATH).read().splitlines())

    # Simple insult
    if np.random.uniform(0, 1) < 0.25:
        text = generate_targeted_comment(post_context['user'])
    else:
        text = PERSONAS_SAMPLERS[persona_idx](history[-1], history[:-1])
    return create_comment_context(persona, text)

def generate_generic_posts(user_context, count=1):
    results = []
    while len(results) < count:
        try:
            results.append(generate_generic_post(copy.deepcopy(user_context)))
        except:
            continue
    return results

def generate_targeted_posts(user_context, count=1):
    results = []
    while len(results) < count:
        try:
            results.append(generate_targeted_post(copy.deepcopy(user_context)))
        except:
            continue
    return results
