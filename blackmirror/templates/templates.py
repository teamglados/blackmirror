import pandas as pd
import numpy as np

from blackmirror.utils import *

def create_personas(count=1, p_malicious=0.25):

    MALICIOUS_PERSONAS = [
        'i hate everything',
        'i question everything',
        'i think you are stupid',
        'i think you are a loser',
        'i don\'t believe anything',
    ]

    identities_path = search_path('**/template_cache/source_text/identities.csv')
    properties_path = search_path('**/template_cache/source_text/properties.txt')
    images_male_path = search_path('**/template_cache/source_image/male')
    images_female_path = search_path('**/template_cache/source_image/female')
    personas = []

    with open(properties_path) as properties_file:
        properties = properties_file.read()

    df = pd.read_csv(identities_path).sample(count)
    for n, row in df.iterrows():

        fields = {}
        personality = properties
        for key, value in row.items():
            personality = personality.replace('<{}>'.format(key), str(value))
            fields[key] = value
        personality = personality.splitlines()

        image = sample_random_path(images_male_path if row.Gender == 'male' else images_female_path)
        is_malicious = np.random.uniform(0, 1) < p_malicious
        if is_malicious:
            personality = MALICIOUS_PERSONAS
        personas.append((personality, image, is_malicious, fields))
    return personas
