import json
from typing import Dict, Any, List
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED, NO_VALUE_IN_DB

TABLE_NAME = "feeditem"

ADD = f"INSERT INTO {TABLE_NAME} (user_id, context) VALUES (%s, %s) RETURNING *;"
ADD_EMPTY = f"INSERT INTO {TABLE_NAME} (user_id) VALUES (%s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE user_id=%s;"
GET_BY_USER = f"SELECT * FROM {TABLE_NAME} WHERE user_id=%s;"
UPDATE = f"UPDATE {TABLE_NAME} SET context = %s WHERE id=%s"


def to_dict(row):
    row_d = dict(row)
    if "context" in row_d and row_d["context"]:
        row_d["context"] = json.loads(row_d["context"])
    return row_d

@with_dbc
def add_empty(user_id: str, dbc=PGInterface(),) -> Dict[Any, Any]:
    row = dbc.fetchone(ADD_EMPTY, params=(user_id), as_dict=True)
    if row:
        return to_dict(row)
    raise TypeError(NO_ID_RETURNED)

@with_dbc
def add(user_id: str, context: Dict[Any, Any], dbc=PGInterface(),) -> Dict[Any, Any]:
    row = dbc.fetchone(ADD, params=(user_id, json.dumps(context)), as_dict=True)
    if row:
        return to_dict(row)
    raise TypeError(NO_ID_RETURNED)

@with_dbc
def get_by_user(user_id: str, dbc=PGInterface()) -> List[Dict[Any, Any]]:
    rows = dbc.fetchall(GET_BY_USER, params=(user_id,), as_dict=True)
    return [to_dict(row) for row in rows]

@with_dbc
def get(feed_id: str, dbc=PGInterface()) -> Dict[Any, Any]:
    row = dbc.fetchone(GET, params=(feed_id,), as_dict=True)
    if row:
        return to_dict(row)
    raise TypeError(NO_VALUE_IN_DB)


@with_dbc
def update(feed_id: str, context: Dict[Any, Any], dbc=PGInterface()) -> None:
    params = (json.dumps(context), feed_id)
    dbc.execute(UPDATE, params=params)
