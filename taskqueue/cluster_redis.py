import os
import redis

REDISSOCK: str = os.getenv("REDISSOCK", "redis")
LOCAL_SOCKET_CONNECT_TIMEOUT: float = float(
    os.getenv("LOCAL_SOCKET_CONNECT_TIMEOUT", "30")
)
LOCAL_SOCKET_TIMEOUT: float = float(os.getenv("LOCAL_SOCKET_CONNECT_TIMEOUT", "30"))

if REDISSOCK == "redis":
    LOCAL_REDIS: redis.StrictRedis = redis.StrictRedis(host=REDISSOCK)
else:
    LOCAL_REDIS = redis.StrictRedis(
        unix_socket_path=REDISSOCK,
        socket_connect_timeout=LOCAL_SOCKET_CONNECT_TIMEOUT,
        socket_timeout=LOCAL_SOCKET_TIMEOUT,
    )


def get_ephemeral():
    return LOCAL_REDIS
