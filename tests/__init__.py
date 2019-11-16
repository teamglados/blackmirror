import os
import json
import time
import unittest
from unittest import mock
from uuid import uuid4
from typing import Dict, Any, Optional

from dal import user_dal
from dal import github_dal
from dal import feeditem_dal

GITHUB_STATS = {
    "first_name": "Ville",
    "last_name": "Toiviainen",
    "bio": "Machine Learning Engineer at Intuition Machines",
    "country": "Finland",
    "is_pro_user": True,
    "organizations": ["Glados"],
    "profile_picture_url": "https://avatars3.githubusercontent.com/u/4243244",
    "repositories": ["https://github.com/Villux/golden_goal"],
    "used_languages": ["Python", "Jupyter Notebook"],
    "stars": 110,
    "followers": 11,
    "following": 14,
}


class BMTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def _add_user(self, **kwargs) -> Dict[Any, Any]:
        first_name = kwargs.get("first_name", "Mike")
        last_name = kwargs.get("last_name", "Smith")
        github_user = kwargs.get("github_user", "Villux")
        image = kwargs.get("image")

        return user_dal.add(first_name, last_name, github_user, image)

    def _add_github_user(self, username: str = "Villux") -> None:
        github_dal.add(username)

    def _update_githut_stats(
        self, username: str = "Villux", data: Optional[Dict[Any, Any]] = None
    ) -> None:
        if not data:
            data = GITHUB_STATS
        github_dal.update(username, data)

    def _add_feed_item(self, **kwargs):
        post_text = kwargs.get("post_text", "This is my first post!")
        post_image = kwargs.get("post_image", "img/post_image.png")
        parent_id = kwargs.get("parent_id", None)
        return feeditem_dal.add(post_text, post_image, parent_id)

    def _update_feed_item(self, feed_id, **kwargs):
        for _ in range(kwargs.get("add_comments", 1)):
            self._add_feed_item(parent_id=feed_id)

        data = {
            "parent_id": kwargs.get("parent_id", None),
            "post_text": kwargs.get("post_text", "This is my first post!"),
            "post_image": kwargs.get("post_image", "img/post_image.png"),
            "like_count": kwargs.get("like_count", 2)
        }

        feeditem_dal.update(feed_id, data)

