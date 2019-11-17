import json
from typing import Dict, Any, List
import utils
from dal.db import PGInterface
from error_msgs import NO_ID_RETURNED, NO_VALUE_IN_DB

TABLE_NAME = "messages"

ADD = f"INSERT INTO {TABLE_NAME} (user_id, context) VALUES (%s, %s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE user_id=%s;"
UPDATE = f"UPDATE {TABLE_NAME} SET context = %s WHERE user_id=%s"


def add(user_id: str, context: Dict[Any, Any]) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(ADD, params=(user_id, json.dumps(context)), as_dict=True)
    if row:
        return utils.to_dict(row)
    raise TypeError(NO_ID_RETURNED)


def get_by_user(user_id: str) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(GET, params=(user_id,), as_dict=True)
    if row:
        return utils.to_dict(row)
    raise TypeError(NO_VALUE_IN_DB)


def update(user_id: str, context: Dict[Any, Any]) -> None:
    params = (json.dumps(context), user_id)
    with PGInterface() as dbc:
        dbc.execute(UPDATE, params=params)
