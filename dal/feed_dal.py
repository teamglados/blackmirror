import json
import utils
from typing import Dict, Any, List
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED, NO_VALUE_IN_DB

TABLE_NAME = "feed"

ADD = f"INSERT INTO {TABLE_NAME} (user_id, context) VALUES (%s, %s) RETURNING *;"
ADD_EMPTY = f"INSERT INTO {TABLE_NAME} (user_id) VALUES (%s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE id=%s;"
GET_BY_USER = f"SELECT * FROM {TABLE_NAME} WHERE user_id=%s;"
UPDATE = f"UPDATE {TABLE_NAME} SET context = %s WHERE id=%s"


def add_empty(user_id: str) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(ADD_EMPTY, params=(user_id), as_dict=True)
    if row:
        return utils.to_dict(row)
    raise TypeError(NO_ID_RETURNED)


def add(user_id: str, context: Dict[Any, Any]) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(ADD, params=(user_id, json.dumps(context)), as_dict=True)
    if row:
        return utils.to_dict(row)
    raise TypeError(NO_ID_RETURNED)


def get_by_user(user_id: str) -> List[Dict[Any, Any]]:
    with PGInterface() as dbc:
        rows = dbc.fetchall(GET_BY_USER, params=(user_id,), as_dict=True)
    return [utils.to_dict(row) for row in rows]


def get(feed_id: str) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(GET, params=(feed_id,), as_dict=True)
    if row:
        return utils.to_dict(row)
    raise TypeError(NO_VALUE_IN_DB)


def update(feed_id: str, context: Dict[Any, Any]) -> None:
    params = (json.dumps(context), feed_id)
    with PGInterface() as dbc:
        dbc.execute(UPDATE, params=params)
