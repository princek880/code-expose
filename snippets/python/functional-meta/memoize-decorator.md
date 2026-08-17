---
lang: python
topic: functional-meta
tier: 3
tags: [functional, memoize, decorator]
note: Keying on args plus sorted kwargs makes the cache correct for keyword calls too.
---
from functools import wraps

def memoize(fn):
    cache = {}

    @wraps(fn)
    def inner(*args, **kwargs):
        key = (args, tuple(sorted(kwargs.items())))
        if key not in cache:
            cache[key] = fn(*args, **kwargs)
        return cache[key]

    inner.cache = cache
    inner.clear = cache.clear
    return inner

@memoize
def ackermann(m, n):
    if m == 0:
        return n + 1
    if n == 0:
        return ackermann(m - 1, 1)
    return ackermann(m - 1, ackermann(m, n - 1))

print(ackermann(2, 3), len(ackermann.cache) > 5, ackermann(m=2, n=3))
