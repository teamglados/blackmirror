from typing import Dict, Any, List
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED, NO_VALUE_IN_DB

TABLE_NAME = "messages"

ADD = f"INSERT INTO {TABLE_NAME} (content, user_id, creator_id) VALUES (%s, %s, %s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE id=%s;"
GET_CONVERSATION = f"SELECT * FROM {TABLE_NAME} WHERE creator_id=%s;"
UPDATE_IMAGE = f"UPDATE {TABLE_NAME} set image = %s WHERE id=%s;"


@with_dbc
def add(content: str, user_id: str, creator: str, dbc=PGInterface()) -> Dict[Any, Any]:
    row = dbc.fetchone(ADD, params=(content, user_id, creator), as_dict=True)
    if row:
        return dict(row)
    raise TypeError(NO_ID_RETURNED)


@with_dbc
def get(message_id: str, dbc=PGInterface()) -> Dict[Any, Any]:
    row = dbc.fetchone(GET, params=(message_id,), as_dict=True)
    if row:
        return dict(row)
    raise TypeError(NO_VALUE_IN_DB)


@with_dbc
def get_conversation(creator_id: str, dbc=PGInterface()) -> List[Dict[Any, Any]]:
    rows = dbc.fetchall(GET_CONVERSATION, params=(creator_id,), as_dict=True)
    return [dict(row) for row in rows]


@with_dbc
def update_profile_pic(message_id: str, image: str, dbc=PGInterface()) -> None:
    dbc.execute(UPDATE_IMAGE, params=(image, message_id))
