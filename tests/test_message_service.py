from tests import BMTestCase
from message_service import get_messages


class MessageServiceTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_messages(self):
        user = self._add_user()
        self._create_realistic_chat(user["id"])

        message_data = get_messages(user["id"])

        self.assertEqual(len(message_data["messages"]), 4)
        self.assertEqual(len(message_data["users"]), 2)

        self.assertEqual(
            message_data["messages"][-1]["content"],
            "Not really, I will just stay home and code.",
        )
        self.assertEqual(message_data["messages"][0]["content"], "What's up?")
