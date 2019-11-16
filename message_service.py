from typing import Dict, Any
from dal import message_dal
from dal import user_dal


def get_messages(user_id: str) -> Dict[Any, Any]:
    messages = message_dal.get_conversation(user_id)

    user_ids = []
    for message in messages:
        user_ids.append(message["creator_id"])

    users = {}
    for uid in set(user_ids):
        users[uid] = user_dal.get(uid)

    return {
        "messages": sorted(
            messages, key=lambda x: x["timestamp_ms_created"], reverse=False
        ),
        "users": users,
    }
