---
lang: python
topic: nways
tier: 2
tags: [nways, memoize, cache]
note: A hand-rolled dict cache and @lru_cache do the same job; the decorator just spares you the boilerplate.
---
calls = {"manual": 0, "cached": 0}
_cache = {}

def manual_square(n):
    if n not in _cache:
        calls["manual"] += 1
        _cache[n] = n * n
    return _cache[n]

from functools import lru_cache

@lru_cache(maxsize=None)
def cached_square(n):
    calls["cached"] += 1
    return n * n

manual_square(5); manual_square(5)
cached_square(5); cached_square(5)
print(calls)
