import time
from tests import BMTestCase
from dal import feeditem_dal


class GithubStatsDalTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_add(self):
        feed_id = self._add_feed_item().get("id")
        feed_item = feeditem_dal.get_post_and_comments(feed_id)[0]
        self.assertEqual(feed_item["like_count"], 0)

    def test_update(self):
        feed_item = self._add_feed_item()
        self._update_feed_item(feed_item["id"], add_comments=1)

        feed_items = feeditem_dal.get_post_and_comments(feed_item["id"])
        self.assertEqual(len(feed_items), 2)

        self.assertEqual(len([i for i in feed_items if not i["parent_id"]]), 1)
        self.assertEqual(len([i for i in feed_items if i["parent_id"]]), 1)

    def test_update_image(self):
        feed_item = self._add_feed_item()
        url = "http://test_url"
        feeditem_dal.update_image(feed_item["id"], url)
        feed_item = feeditem_dal.get(feed_item["id"])
        self.assertEqual(feed_item["post_image"], url)