---
lang: python
topic: core-syntax
tier: 1
tags: [collections, defaultdict]
note: The factory is called with no arguments, which is why you pass list, not [].
---
from collections import defaultdict

pairs = [("a", 1), ("b", 2), ("a", 3), ("c", 4), ("b", 5)]
groups = defaultdict(list)
for k, v in pairs:
    groups[k].append(v)

totals = defaultdict(int)
for k, v in pairs:
    totals[k] += v

nested = defaultdict(lambda: defaultdict(set))
nested["x"]["y"].add(1)
print(dict(groups), dict(totals), nested["x"]["y"])
