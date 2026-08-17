---
lang: python
topic: concurrency
tier: 3
tags: [concurrent-futures, exceptions, cancel]
note: An exception inside a worker surfaces when you touch result(), not when the task runs.
---
from concurrent.futures import ThreadPoolExecutor, wait, FIRST_EXCEPTION

def risky(n):
    if n == 3:
        raise ValueError("three is bad")
    return n

with ThreadPoolExecutor(max_workers=2) as pool:
    futures = [pool.submit(risky, n) for n in range(5)]
    done, pending = wait(futures, return_when=FIRST_EXCEPTION)
    errors, values = [], []
    for f in futures:
        try:
            values.append(f.result())
        except ValueError as e:
            errors.append(str(e))

print(values, errors, len(done) + len(pending) == 5)
