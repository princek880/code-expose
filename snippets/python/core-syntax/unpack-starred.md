---
lang: python
topic: core-syntax
tier: 1
tags: [unpacking, star]
note: Exactly one starred target is allowed, and it always collects a list.
---
head, *rest = [1, 2, 3, 4, 5]
*init, last = "abcdef"
first, *middle, final = range(10)
(a, b), (c, d) = (1, 2), (3, 4)
merged = [*init[:2], *middle[-2:], last]
