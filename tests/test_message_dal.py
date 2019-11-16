import time
from tests import BMTestCase
from dal import message_dal


class UsersDalTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_conversation(self):
        creator = self._add_user()["id"]
        counterparty = self._add_user()["id"]

        self._create_conversation(creator, [counterparty, creator])

        conversation = message_dal.get_conversation(creator)
        self.assertEqual(len(conversation), 5)
        self.assertListEqual([0,1,2,3,4], [int(i["content"][0]) for i in sorted(conversation, key=lambda x: x["timestamp_ms_created"])])
