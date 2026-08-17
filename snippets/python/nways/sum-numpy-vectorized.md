---
lang: python
topic: nways
tier: 1
tags: [nways, sum, numpy]
note: np.sum runs a compiled reduction over contiguous memory; the Python loop pays interpreter overhead per element.
---
import numpy as np

xs = list(range(1, 6))
arr = np.array(xs)

manual = 0
for x in xs:
    manual += x

builtin = sum(xs)
vectorized = int(np.sum(arr))
print(manual, builtin, vectorized, manual == builtin == vectorized)
