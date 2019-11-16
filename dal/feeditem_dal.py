import time
from typing import Dict, Any, Optional, List
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED

TABLE_NAME = "feeditem"

ADD = f"INSERT INTO {TABLE_NAME} (post_text, post_image, parent_id) VALUES (%s, %s, %s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE id=%s OR parent_id=%s;"
UPDATE = f"UPDATE {TABLE_NAME} SET post_text = %s, post_image = %s, parent_id = %s, \
                                   like_count = %s, timestamp_ms_updated = %s WHERE id=%s"


@with_dbc
def add(
    post_text: str, post_image: str, parent_id: Optional[str] = None, dbc=PGInterface()
) -> Dict[Any, Any]:
    row = dbc.fetchone(ADD, params=(post_text, post_image, parent_id), as_dict=True)
    if row:
        return dict(row)
    raise TypeError(NO_ID_RETURNED)


@with_dbc
def get_post_and_comments(feed_id: str, dbc=PGInterface()) -> List[Dict[Any, Any]]:
    rows = dbc.fetchall(GET, params=(feed_id, feed_id), as_dict=True)
    return [dict(row) for row in rows]

@with_dbc
def update(feed_id: str, data: Dict[Any, Any], dbc=PGInterface()) -> None:
    params = (
        data["post_text"],
        data["post_image"],
        data["parent_id"],
        data["like_count"],
        int(round(time.time() * 1000)),
        feed_id
    )
    dbc.execute(UPDATE, params=params)
