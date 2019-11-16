from tests import BMTestCase
from feed_service import get_feed_for_user


class FeedServiceTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_feed(self):
        user = self._add_user()
        self._create_realistic_feed(user["id"])

        feed_data = get_feed_for_user(user["id"])

        self.assertEqual(len(feed_data["feed"]), 2)
        self.assertEqual(len(feed_data["users"]), 3)

        self.assertEqual(len(feed_data["feed"][0]["comments"]), 1)
        self.assertEqual(len(feed_data["feed"][1]["comments"]), 2)
