---
lang: python
topic: core-syntax
tier: 1
tags: [collections, counter]
note: Counter arithmetic drops zero and negative counts, which is usually what you want.
---
from collections import Counter

c = Counter("mississippi")
print(c.most_common(2), c["z"], sum(c.values()))
print(c - Counter("issi"), (c & Counter("pip")))
words = Counter(["a", "b", "a", "c", "a"])
words.update(["b", "d"])
print(words.total(), sorted(words.elements())[:4])
