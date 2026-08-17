---
lang: python
topic: core-syntax
tier: 3
tags: [contextlib, generator]
note: Everything before yield is __enter__; the finally block is __exit__.
---
from contextlib import contextmanager
import time

@contextmanager
def timed(label):
    t0 = time.perf_counter()
    try:
        yield lambda: time.perf_counter() - t0
    finally:
        print(f"{label}: {time.perf_counter() - t0:.4f}s")

with timed("work") as elapsed:
    total = sum(i * i for i in range(1000))
    print(f"{elapsed():.6f}")
