---
lang: python
topic: core-syntax
tier: 2
tags: [functools, cache, memo]
note: lru_cache keys on the arguments, so every one of them must be hashable.
---
from functools import lru_cache, cache

@lru_cache(maxsize=None)
def collatz(n):
    if n == 1:
        return 0
    return 1 + collatz(3 * n + 1 if n % 2 else n // 2)

@cache
def comb(n, k):
    if k in (0, n):
        return 1
    return comb(n - 1, k - 1) + comb(n - 1, k)

print(collatz(27), comb(30, 15), comb.cache_info().hits > 0)
