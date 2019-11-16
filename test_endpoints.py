import requests

ENDPOINT = "http://localhost:5000"


def create_user():
    data = {"first_name": "Ville", "last_name": "Toiviainen", "github_user": "Villux"}
    res = requests.post(f"{ENDPOINT}/api/users", json=data)
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
