import os
import json
import time
import unittest
import random
from unittest import mock
from uuid import uuid4
from typing import Dict, Any, Optional, List

import utils
from dal import user_dal
from dal import github_dal
from dal import feeditem_dal
from dal import message_dal

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
        image = kwargs.get("image", f"{utils.get_root_path()}/uploads/ville.jpeg")
        keywords = kwargs.get("keywords", {
            "movies": ["Terminator"],
            "hobbies": ["Football"]
        })

        return user_dal.add(first_name, last_name, image, keywords)

    def _add_github_user(self, username: str = "Villux") -> None:
        github_dal.add(username)

    def _update_githut_stats(
        self, username: str = "Villux", data: Optional[Dict[Any, Any]] = None
    ) -> None:
        if not data:
            data = GITHUB_STATS
        github_dal.update(username, data)

    def _add_feed_item(self, user_id: str, creator_id: str, **kwargs):
        post_text = kwargs.get("post_text", "This is my first post!")
        parent_id = kwargs.get("parent_id", None)
        return feeditem_dal.add(post_text, user_id, creator_id, parent_id=parent_id)

    def _update_feed_item(self, user_id: str, feed_id: str, creator_id: str, **kwargs):
        for _ in range(kwargs.get("add_comments", 1)):
            self._add_feed_item(user_id, creator_id, parent_id=feed_id)

        data = {
            "post_text": kwargs.get("post_text", "This is my first post!"),
            "post_image": kwargs.get("post_image", "img/post_image.png"),
            "like_count": kwargs.get("like_count", 2),
        }

        feeditem_dal.update(
            feed_id,
            kwargs.get("post_text", "This is my first post!"),
            kwargs.get("post_image", "img/post_image.png"),
            kwargs.get("like_count", 2),
        )

    def _add_message(self, user_id: str, creator: str, **kwargs):
        content = kwargs.get("content", "Hey, what's up?")
        return message_dal.add(content, user_id, creator)

    def _create_conversation(self, user_id: str, friend_ids: List[str]):
        counter = 0
        self._add_message(user_id, user_id, content=f"{counter}_{str(uuid4())}")
        for _ in range(2):
            for friend in friend_ids:
                counter += 1
                self._add_message(user_id, friend, content=f"{counter}_{str(uuid4())}")

    def _create_realistic_feed(self, user_id: str) -> None:
        creator = self._add_user()
        creator2 = self._add_user()

        # Add first post
        post_text = "What an event again! Junction is just pure awesomenes!"
        feed_item = self._add_feed_item(user_id, creator["id"], post_text=post_text)

        post_reply = "That's true, just love this event :)"
        self._add_feed_item(
            user_id, user_id, post_text=post_reply, parent_id=feed_item["id"]
        )

        # Add second post
        post2_text = "Anybody want to play tennis?"
        feed2_item = self._add_feed_item(user_id, creator2["id"], post_text=post2_text)

        post_final = "Yep, next year again"
        self._add_feed_item(
            user_id, creator["id"], post_text=post_final, parent_id=feed_item["id"]
        )

        post2_final = "Not today but maybe next week?"
        self._add_feed_item(
            user_id, user_id, post_text=post2_final, parent_id=feed2_item["id"]
        )

    def _create_realistic_chat(self, user_id: str) -> None:
        friend = self._add_user()["id"]

        message1 = "What's up?"
        message_dal.add(message1, user_id, friend)
        message2 = "Not much... watching Netflix"
        message_dal.add(message2, user_id, user_id)
        message3 = "Any ideas for the weekend?"
        message_dal.add(message3, user_id, user_id)
        message4 = "Not really, I will just stay home and code."
        message_dal.add(message4, user_id, friend)
