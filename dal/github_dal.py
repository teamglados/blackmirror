import time
from typing import Dict, Any
from dal.db import PGInterface
from dal.connection_decorator import with_dbc
from error_msgs import NO_ID_RETURNED

TABLE_NAME = "github_stats"

ADD = f"INSERT INTO {TABLE_NAME} (username) VALUES (%s) ON CONFLICT (username) DO NOTHING RETURNING *;"
GET = f"SELECT * FROM {TABLE_NAME} WHERE username=%s;"
UPDATE = f"UPDATE {TABLE_NAME} set first_name = %s,last_name = %s,bio = %s,country = %s,is_pro_user = %s,organizations = %s, \
                                   profile_picture_url = %s,repositories = %s,used_languages = %s,stars = %s,followers = %s, \
                                   following = %s, timestamp_ms_updated = %s WHERE username=%s"


@with_dbc
def add(username: str, dbc=PGInterface()) -> None:
    dbc.execute(ADD, params=(username,))


@with_dbc
def update(username: str, data: Dict[Any, Any], dbc=PGInterface()) -> None:
    params = (
        data["first_name"],
        data["last_name"],
        data["bio"],
        data["country"],
        data["is_pro_user"],
        data["organizations"],
        data["profile_picture_url"],
        data["repositories"],
        data["used_languages"],
        data["stars"],
        data["followers"],
        data["following"],
        int(round(time.time() * 1000)),
        username,
    )
    dbc.execute(UPDATE, params=params)


@with_dbc
def get(username: str, dbc=PGInterface()) -> Dict[Any, Any]:
    row = dbc.fetchone(GET, params=(username,), as_dict=True)
    if row:
        return dict(row)
    raise TypeError(NO_ID_RETURNED)
