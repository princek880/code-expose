---
lang: python
topic: concurrency
tier: 3
tags: [gil, threading, io-bound]
note: Threads help IO-bound work because the GIL is released during the wait; CPU-bound work needs processes.
---
import time
from concurrent.futures import ThreadPoolExecutor

def io_bound(n):
    time.sleep(0.05)
    return n

def cpu_bound(n):
    return sum(i * i for i in range(200_000))

def timed(fn, workers):
    t0 = time.perf_counter()
    with ThreadPoolExecutor(max_workers=workers) as pool:
        list(pool.map(fn, range(4)))
    return time.perf_counter() - t0

io_serial, io_parallel = timed(io_bound, 1), timed(io_bound, 4)
print(io_serial > 0.19, io_parallel < 0.12, round(io_serial / io_parallel, 1) > 2)
