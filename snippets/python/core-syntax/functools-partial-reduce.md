---
lang: python
topic: core-syntax
tier: 2
tags: [functools, partial, reduce]
note: partial freezes leading positional arguments; keywords can still be overridden.
---
from functools import partial, reduce
from operator import mul, itemgetter

pow2 = partial(pow, 2)
join = partial(str.join, "-")
product = partial(reduce, mul)

rows = [("b", 2), ("a", 9), ("c", 5)]
print(pow2(10), join(["x", "y"]), product([1, 2, 3, 4]))
print(sorted(rows, key=itemgetter(1))[-1])
