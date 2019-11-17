from uuid import uuid4

from typing import Dict, Any, Optional
from dal import user_dal
from dal import message_dal


class MessageContext:
    def __init__(self, user_id: str):
        self.user_id = user_id
        try:
            context_holder = message_dal.get_by_user(user_id)
            self.context = context_holder["context"]
        except TypeError:
            self.context = None

    def upsert(self, context):
        message_dict = {}
        for message in context["messages"]:
            message_dict[message["content"]["timestamp_ms_created"]] = message
        if not self.context:
            context_holder = message_dal.add(self.user_id, context)
            self.context = context_holder["context"]
        else:
            for message in self.context["messages"]:
                message_dict[message["content"]["timestamp_ms_created"]] = message
            self.context["messages"] = list(message_dict.values())

        self.context["messages"] = sorted(
            self.context["messages"], key=lambda x: x["content"]["timestamp_ms_created"]
        )

        # add id for teemu
        for message in self.context["messages"]:
            if not "id" in message:
                message["id"] = str(uuid4())
        message_dal.update(self.user_id, self.context)
        return self.context
