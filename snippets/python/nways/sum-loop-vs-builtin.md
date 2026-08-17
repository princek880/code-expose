---
lang: python
topic: nways
tier: 1
tags: [nways, sum, reduce]
note: sum() is a tight C loop; a hand-written loop and reduce do the identical work at Python speed.
---
from functools import reduce

xs = [1, 2, 3, 4, 5]

manual = 0
for x in xs:
    manual += x

builtin = sum(xs)
reduced = reduce(lambda a, b: a + b, xs)
print(manual, builtin, reduced, manual == builtin == reduced)
