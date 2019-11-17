import os
from typing import List, Optional
import psycopg2
import psycopg2.extras
from psycopg2.extras import DictRow
from psycopg2.pool import ThreadedConnectionPool

from utils import get_logger

PGHOST = os.getenv("PGHOST", "db")
PGUSER = os.getenv("PGUSER", "postgres")
PGPORT = int(os.getenv("PGPORT", "5432"))
PGDBNAME = os.getenv("PGDATABASE", "postgres")
PGSSLMODE = os.getenv("PGSSLMODE", "require")
PGPASSWORD = os.getenv("PGPASSWORD", None)

TCP = ThreadedConnectionPool(
    1, 30, host=PGHOST, port=PGPORT, user=PGUSER, dbname=PGDBNAME, sslmode=PGSSLMODE,
    password=PGPASSWORD
)

FETCHALL = 0
FETCHONE = 1
FETCHMANY = 2


class PGInterfaceError(Exception):
    pass


class PGInterface:
    def __init__(self):
        self.logger = get_logger("PGInterface")
        self.conn = None

    def __enter__(self):
        self.conn = TCP.getconn()
        return self

    def __exit__(self, *exc):
        TCP.putconn(self.conn)

    def _execute(self, query, params, fetch=None, size=None, as_dict=None):
        if fetch == FETCHMANY and not (size and isinstance(size, int)):
            raise ValueError("Size for fetchmany needs to be larger than 0")

        cursor_factory = psycopg2.extras.DictCursor if as_dict else None
        try:
            cursor = self.conn.cursor(cursor_factory=cursor_factory)
            # if multi query execution
            if isinstance(query, list):
                for idx, q in enumerate(query):
                    p = params[idx] if params and idx < len(params) else None
                    cursor.execute(q, p)
            else:
                cursor.execute(query, params)

            output = None
            if fetch == FETCHALL:
                output = cursor.fetchall()
            elif fetch == FETCHONE:
                output = cursor.fetchone()
            elif fetch == FETCHMANY:
                output = cursor.fetchmany()

            self.conn.commit()
            return output

        except psycopg2.Error as error:
            self.logger.error(f"DB problem occured: {error}")
            self.conn.rollback()
            raise PGInterfaceError(f"Db error occured: {error}")
        finally:
            cursor.close()

    def executemany(self, query, params):
        try:
            cursor = self.conn.cursor()
            cursor.executemany(query, params)
            self.conn.commit()
        except psycopg2.Error as error:
            self.logger.error(f"DB problem occured with executemany: {error}")
            self.conn.rollback()
            raise PGInterfaceError(f"Db error occured with executemany: {error}")
        finally:
            cursor.close()

    def execute(self, query, params=None, as_dict=None) -> None:
        self._execute(query, params, as_dict=as_dict)

    def fetchone(self, query, params=None, as_dict=None) -> Optional[DictRow]:
        return self._execute(query, params, fetch=FETCHONE, as_dict=as_dict)

    def fetchall(self, query, params=None, as_dict=None) -> List[DictRow]:
        return self._execute(query, params, fetch=FETCHALL, as_dict=as_dict)

    def fetchmany(self, query, size, params=None, as_dict=None):
        return self._execute(query, params, fetch=FETCHMANY, size=size, as_dict=as_dict)
