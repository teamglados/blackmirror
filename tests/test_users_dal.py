import time
from tests import BMTestCase
from dal import user_dal


class UsersDalTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_add(self):
        """ Test that add and get works """
        user = self._add_user()
        fetched_user = user_dal.get(user["id"])
        self.assertEqual(user["first_name"], fetched_user["first_name"])

