from tests import BMTestCase
from dal import feeditem_dal


class GithubStatsDalTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_add(self):
        user = self._add_user()["id"]
        creator = self._add_user()["id"]
        feed_id = self._add_feed_item(user, creator).get("id")
        feed_item = feeditem_dal.get(feed_id)
        self.assertEqual(feed_item["like_count"], 0)

    def test_update(self):
        user = self._add_user()["id"]
        creator = self._add_user()["id"]
        feed_item = self._add_feed_item(user, creator)
        self._update_feed_item(user, feed_item["id"], creator, add_comments=1)

        feed_items = feeditem_dal.get_by_user(user)
        self.assertEqual(len(feed_items), 2)

        self.assertEqual(len([i for i in feed_items if not i["parent_id"]]), 1)
        self.assertEqual(len([i for i in feed_items if i["parent_id"]]), 1)

    def test_update_image(self):
        user = self._add_user()["id"]
        creator = self._add_user()["id"]
        feed_item = self._add_feed_item(user, creator)
        url = "http://test_url"
        feeditem_dal.update_image(feed_item["id"], url)
        feed_item = feeditem_dal.get(feed_item["id"])
        self.assertEqual(feed_item["post_image"], url)
