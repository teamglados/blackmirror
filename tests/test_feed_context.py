import time

from tests import BMTestCase
from feed_context import FeedContext
from dal import feed_dal


class FeedContextTest(BMTestCase):
    def test_update_empty(self):
        user = self._add_user()
        context = self._create_post(user)
        mc = FeedContext(user["id"])

        mc.upsert(context)
        feed = feed_dal.get_by_user(user["id"])[0]

        self.assertEqual(feed["context"]["user"]["id"], user["id"])
        self.assertEqual(len(feed["context"]["comments"]), 1)

    def test_upsert(self):
        user = self._add_user()
        context = self._create_post(user)
        time.sleep(0.2)
        context["comments"].append(self._create_content(user))
        time.sleep(0.2)
        mc = FeedContext(user["id"])
        mc.upsert(context)

        feed = feed_dal.get_by_user(user["id"])[0]
        self.assertEqual(len(feed["context"]["comments"]), 2)

        mc = FeedContext(user["id"], feed["context"]["id"])
        context["comments"] = [self._create_content(user)]

        mc.upsert(context)
        feed = feed_dal.get_by_user(user["id"])[0]
        self.assertEqual(len(feed["context"]["comments"]), 3)
