import os
import multiprocessing

if "development" in os.getenv("APP_SETTINGS", "development"):
    workers = 2
else:
    workers = int(multiprocessing.cpu_count()) * 2
