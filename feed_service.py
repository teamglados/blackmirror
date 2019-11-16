from typing import List, Dict, Any, Set, Tuple
from dal import feeditem_dal
from dal import user_dal


def create_mock_feed(user_id: str):
    ville = user_dal.add("Ville", "Toiviainen", "Villux")["id"]
    user_dal.update_profile_pic(ville, "/uploads/ville.jpeg")

    andreas = user_dal.add("Andreas", "Urbanski", "nardeas")["id"]
    user_dal.update_profile_pic(andreas, "/uploads/andreas.jpeg")

    post1 = "What an event again! Junction is just pure awesomenes!"
    feed_item = feeditem_dal.add(post1, user_id, ville)
    feeditem_dal.update_image(feed_item["id"], "/uploads/junction.jpeg")

    post2 = "Today I managed to catch a huge fish. I feel so lucky!"
    feed_item = feeditem_dal.add(post2, user_id, andreas)

    post3 = (
        "Joker movie was good, but I still like Huge Ledger more. Maybe I'm just weird?"
    )
    feed_item = feeditem_dal.add(post3, user_id, andreas)

    post4 = "Too much candy is too much. Next more wine!"
    feed_item = feeditem_dal.add(post4, user_id, ville)


def get_feed_and_users_with_grouped_comments(
    feed: List[Dict[Any, Any]]
) -> Tuple[List[Dict[Any, Any]], Set[str]]:
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

    users = {}
    for uid in user_ids:
        users[uid] = user_dal.get(uid)

    return {
        "feed": sorted(feed, key=lambda x: x["timestamp_ms_created"], reverse=True),
        "users": users,
    }
