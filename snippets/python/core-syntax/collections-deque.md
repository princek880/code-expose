---
lang: python
topic: core-syntax
tier: 2
tags: [collections, deque]
note: A bounded deque discards from the far end on push, which makes it a sliding window.
---
from collections import deque

d = deque([1, 2, 3], maxlen=4)
d.append(4); d.append(5)
d.appendleft(0)
print(d, d[0], d[-1])
d.rotate(2)
print(d)
d.extendleft([9, 8])
print(list(d), len(d))
