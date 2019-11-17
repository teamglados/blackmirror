import requests

ENDPOINT = "http://ec2-63-35-251-51.eu-west-1.compute.amazonaws.com:5000"


def create_user():
    payload = {
        "first_name": "Mike",
        "last_name": "Smith",
        "image": "asdsadasdasd",
        "keywords": {
            "name": "hobby",
            "options": ["Cooking", "Cosplaying",],
        }
    }
    res = requests.post(f"{ENDPOINT}/api/users", json=payload)
    res.raise_for_status()
    return res.json()

def get_feed(user_id):
    res = requests.get(f"{ENDPOINT}/api/feed/{user_id}")
    res.raise_for_status()
    return res.json()



def _upload_profile_pic(user_id):
    img_name = "test_image.png"
    url = f"{ENDPOINT}/uploads?userid={user_id}"
    res = requests.post(
        url, files={"file": (img_name, open(f"tests/{img_name}", "rb"))}
    )
    res.raise_for_status()
    return res.text


def _upload_feed_image(feed_id):
    img_name = "test_image.png"
    url = f"{ENDPOINT}/uploads?feedid={feed_id}"
    res = requests.post(
        url, files={"file": (img_name, open(f"tests/{img_name}", "rb"))}
    )
    res.raise_for_status()
    return res.text


def upload_profile_pic():
    user = create_user()
    return _upload_profile_pic(user["id"])


def get_user(user_id):
    res = requests.get(f"{ENDPOINT}/api/users/{user_id}")
    return res.json()
