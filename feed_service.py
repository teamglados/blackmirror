from typing import List, Dict, Any, Set, Tuple
from dal import feeditem_dal
from dal import user_dal

def get_feed_and_users_with_grouped_comments(feed: List[Dict[Any, Any]]) -> Tuple[List[Dict[Any, Any]], Set[str]]:
    posts = {}
    user_ids: List[str] = []
    for item in feed:
        user_ids.append(item["creator_id"])
        if not item["parent_id"]:
            posts[item["id"]] = item
            posts[item["id"]]["comments"] = []
        else:
            posts[item["parent_id"]]["comments"].append(item)

    post_list = []
    for _, post in posts.items():
        post["comments"] = sorted(
            post["comments"], key=lambda x: x["timestamp_ms_created"]
        )
        post_list.append(post)
    return post_list, set(user_ids)


def get_feed_for_user(user_id: str) -> Dict[Any, Any]:
    flat_feed = feeditem_dal.get_by_user(user_id)
    feed, user_ids = get_feed_and_users_with_grouped_comments(flat_feed)

    users = []
    for user_id in user_ids:
        users.append(user_dal.get(user_id))

    return {
        "feed": sorted(feed, key=lambda x: x["timestamp_ms_created"], reverse=True),
        "users": users
    }
