from uuid import uuid4

from typing import Dict, Any, Optional
from dal import user_dal
from dal import feed_dal


class FeedContext:
    def __init__(self, user_id: str, context_id: Optional[str]=None):
        self.user_id = user_id
        if context_id:
            try:
                context_holder = feed_dal.get(context_id)
                self.context = context_holder["context"]
            except TypeError:
                self.context = None
        else:
            self.context = None

    def upsert(self, context):
        comment_dict = {}
        for comment in context["comments"]:
            if not "id" in comment:
                comment["id"] = str(uuid4())

            comment_dict[comment["id"]] = comment
        if not self.context:
            context_holder = feed_dal.add(self.user_id, context)
            self.context = context_holder["context"]
            self.context["id"] = context_holder["id"]
        else:
            for comment in self.context["comments"]:
                comment_dict[comment["id"]] = comment
            self.context["comments"] = list(comment_dict.values())

        self.context["comments"] = sorted(self.context["comments"], key=lambda x: x["content"]["timestamp_ms_created"])
        feed_dal.update(self.context["id"], self.context)
        return self.context

