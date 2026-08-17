---
lang: python
topic: nways
tier: 2
tags: [nways, fibonacci, recursion]
note: Naive recursion is O(2^n); memoizing the same code drops it to O(n) with one decorator.
---
def fib_naive(n):
    if n < 2:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n < 2:
        return n
    return fib_memo(n - 1) + fib_memo(n - 2)

print(fib_naive(15), fib_memo(80))
