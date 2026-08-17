---
lang: python
topic: concurrency
tier: 2
tags: [concurrent-futures, executor, as-completed]
note: map keeps input order; as_completed yields whichever future finishes first.
---
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def work(n):
    time.sleep(0.02 / n)
    return n * n

with ThreadPoolExecutor(max_workers=4) as pool:
    ordered = list(pool.map(work, [1, 2, 3, 4]))
    futures = {pool.submit(work, n): n for n in (1, 2, 3, 4)}
    arrival = [futures[f] for f in as_completed(futures)]

print(ordered, sorted(arrival) == [1, 2, 3, 4], arrival != ordered or True)
