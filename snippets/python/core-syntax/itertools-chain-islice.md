---
lang: python
topic: core-syntax
tier: 2
tags: [itertools, chain, islice]
note: islice consumes the source, so a half-read iterator stays half-read.
---
from itertools import chain, islice, tee, cycle

a, b = [1, 2, 3], (4, 5)
print(list(chain(a, b, "xy")))
print(list(chain.from_iterable([a, list(b)])))
print(list(islice(cycle(a), 7)))
first, second = tee(iter(a))
print(next(first), list(second))
