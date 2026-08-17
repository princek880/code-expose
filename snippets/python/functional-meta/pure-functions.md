---
lang: python
topic: functional-meta
tier: 2
tags: [functional, purity, side-effects]
note: A pure function's output depends only on its arguments, which is what makes it testable and cacheable.
---
from functools import lru_cache

TOTALS = []

def impure(xs):
    TOTALS.append(sum(xs))
    xs.append(0)
    return TOTALS[-1]

@lru_cache(maxsize=None)
def pure(xs):
    return sum(xs)

data = [1, 2, 3]
print(impure(data), data, TOTALS)
frozen = (1, 2, 3)
print(pure(frozen), pure(frozen), pure.cache_info().hits)
