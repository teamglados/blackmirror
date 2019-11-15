import os
import json
import time
import unittest
from unittest import mock
from uuid import uuid4

from dal import user_dal

class BMTestCase(unittest.TestCase):
    def setUp(self):
        pass

    def _add_user(self, **kwargs):
        first_name = kwargs.get("first_name", "Mike")
        last_name = kwargs.get("last_name", "Smith")
        github_user = kwargs.get("github_user", "Villux")
        image_id = kwargs.get("image_id")

        return user_dal.add(first_name, last_name, github_user, image_id)
