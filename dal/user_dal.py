import json
from typing import Dict, Any
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED, NO_VALUE_IN_DB

TABLE_NAME = "users"

ADD = f"INSERT INTO {TABLE_NAME} (first_name, last_name, image, keywords) VALUES (%s, %s, %s, %s) RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE id=%s;"


def to_dict(row):
    row_d = dict(row)
    if "keywords" in row_d and row_d["keywords"]:
        row_d["keywords"] = json.loads(row_d["keywords"])
    return row_d


def add(
    first_name: str,
    last_name: str,
    image: str,
    keywords: Dict[str, str],
) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(
            ADD, params=(first_name, last_name, image, json.dumps(keywords)), as_dict=True
        )
    if row:
        return to_dict(row)
    raise TypeError(NO_ID_RETURNED)

def get(user_id: str) -> Dict[Any, Any]:
    with PGInterface() as dbc:
        row = dbc.fetchone(GET, params=(user_id,), as_dict=True)
    if row:
        return to_dict(row)
    raise TypeError(NO_VALUE_IN_DB)
