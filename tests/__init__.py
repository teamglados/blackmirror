import os
import json
import time
import unittest
from unittest import mock
from uuid import uuid4
from typing import Dict, Any, Optional

from dal import user_dal
from dal import github_dal

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
