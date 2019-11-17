import os
import redis

REDISHOST = os.getenv("REDISHOST")
REDISPORT = int(os.getenv("REDISPORT"))
REDISDB = int(os.getenv("REDISDB", "0"))
REDIS_SSL = os.getenv("REDIS_SSL", "true") == "true"
REDISPW = os.getenv("REDISPW")
KEEP_ALIVE = "true" in os.getenv("SOCKET_KEEPALIVE", "true").lower()
RETRY_ON_TIMEOUT = "true" in os.getenv("SOCKET_RETRY", "true").lower()

SOCKET_CONNECT_TIMEOUT: float = float(
    os.getenv("LOCAL_SOCKET_CONNECT_TIMEOUT", "30")
)
SOCKET_TIMEOUT: float = float(os.getenv("LOCAL_SOCKET_CONNECT_TIMEOUT", "30"))

LOCAL_REDIS = redis.StrictRedis(
    host=REDISHOST,
    port=REDISPORT,
    password=REDISPW,
    ssl=REDIS_SSL,
    socket_connect_timeout=SOCKET_CONNECT_TIMEOUT,
    socket_timeout=SOCKET_TIMEOUT,
    socket_keepalive=KEEP_ALIVE,
    retry_on_timeout=RETRY_ON_TIMEOUT,
)


def get_ephemeral():
    return LOCAL_REDIS
