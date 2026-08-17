---
lang: python
topic: core-syntax
tier: 3
tags: [itertools, groupby]
note: groupby only groups adjacent equal keys, so sort by the same key first.
---
from itertools import groupby
from operator import itemgetter

rows = [("a", 1), ("b", 2), ("a", 3), ("b", 4), ("a", 5)]
rows.sort(key=itemgetter(0))
for key, grp in groupby(rows, key=itemgetter(0)):
    vals = [v for _, v in grp]
    print(key, vals, sum(vals))

runs = ["".join(g) for _, g in groupby("aaabbbccd")]
print(runs)
