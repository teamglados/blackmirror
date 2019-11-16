import os
import json
import time
import unittest
import random
from unittest import mock
from uuid import uuid4
from typing import Dict, Any, Optional, List

import utils
from message_context import MessageContext
from dal import user_dal
from dal import github_dal
from dal import feeditem_dal
from dal import message_dal




class BMTestCase(unittest.TestCase):
    def setUp(self):
        pass

    @staticmethod
    def _create_message(user):
        return {
            "user": user,
            "content": {
                "text": "test message",
                "image": "/path/to/img",
                "timestamp_ms_created": int(round(time.time() * 1000)),
            }
        }

    @staticmethod
    def _create_message_context(user):
        return {
            "user": user,
            "messages": [BMTestCase._create_message(user)]
        }

    def _add_user(self, **kwargs) -> Dict[Any, Any]:
        first_name = kwargs.get("first_name", "Mike")
        last_name = kwargs.get("last_name", "Smith")
        image = kwargs.get("image", f"{utils.get_root_path()}/uploads/ville.jpeg")
        keywords = {
            "name": 'hobby',
            "options": [
                'Cooking',
                'Cosplaying',
            ],
        }

        return user_dal.add(first_name, last_name, image, keywords)

    def _add_message_context(self, user):
        context = self._create_message_context(user)
        mc = MessageContext(user["id"])
        mc.upsert(context)