---
lang: python
topic: core-syntax
tier: 2
tags: [itertools, accumulate, pairwise]
note: accumulate yields the running result including the first element, unlike reduce.
---
from itertools import accumulate, pairwise, zip_longest, starmap
from operator import mul

xs = [3, 1, 4, 1, 5]
print(list(accumulate(xs)))
print(list(accumulate(xs, mul, initial=1)))
print(list(accumulate(xs, max)))
print([b - a for a, b in pairwise(xs)])
print(list(zip_longest(xs, "ab", fillvalue="_")))
print(list(starmap(pow, [(2, 3), (3, 2)])))
