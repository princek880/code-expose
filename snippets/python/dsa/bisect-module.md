---
lang: python
topic: dsa
tier: 2
tags: [bisect, stdlib]
note: The key= parameter means you never have to build a parallel array of keys.
---
from bisect import bisect_left, bisect_right, insort, insort_left

xs = [1, 3, 3, 7]
print(bisect_left(xs, 3), bisect_right(xs, 3), bisect_left(xs, 4))
insort(xs, 5)
insort_left(xs, 0)
print(xs)

rows = [("a", 1), ("b", 4), ("c", 9)]
i = bisect_left(rows, 4, key=lambda r: r[1])
print(rows[i], xs[bisect_left(xs, 3):bisect_right(xs, 3)])
