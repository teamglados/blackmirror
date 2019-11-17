import os
import taskqueue
import bm_redis
RPQUEUE_PROCESSES = int(os.getenv("RPQUEUE_PROCESSES", "2"))
RPQUEUE_THREADS_PER_PROC = int(os.getenv("RPQUEUE_THREADS_PER_PROC", "2"))
RPQUEUE_WAIT_SHUTDOWN = int(os.getenv("RPQUEUE_WAIT_SHUTDOWN", "5"))

if __name__ == "__main__":
    rpq = getattr(taskqueue, "bmqueue")
    rpq.set_redis_connection(bm_redis.get_ephemeral())
    __import__(f"taskqueue.tasks")
    rpq.execute_tasks(
        None, RPQUEUE_THREADS_PER_PROC, RPQUEUE_PROCESSES, module="taskqueue"
    )
