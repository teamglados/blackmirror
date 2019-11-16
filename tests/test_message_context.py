import time

from tests import BMTestCase
from message_context import MessageContext
from dal import message_dal


class MessageContextTest(BMTestCase):
    def test_update_empty(self):
        user = self._add_user()
        context = self._create_message_context(user)
        mc = MessageContext(user["id"])

        mc.upsert(context)
        messages = message_dal.get_by_user(user["id"])

        self.assertEqual(messages["context"]["user"]["id"], user["id"])
        self.assertEqual(len(messages["context"]["messages"]), 1)

    def test_upsert(self):
        user = self._add_user()
        context = self._create_message_context(user)
        time.sleep(0.2)
        context["messages"].append(self._create_message(user))
        time.sleep(0.2)
        mc = MessageContext(user["id"])
        mc.upsert(context)

        messages = message_dal.get_by_user(user["id"])
        print(len(messages["context"]["messages"]))

        mc = MessageContext(user["id"])
        context["messages"] = [self._create_message(user)]
        mc.upsert(context)

        messages = message_dal.get_by_user(user["id"])
        self.assertEqual(len(messages["context"]["messages"]), 3)







