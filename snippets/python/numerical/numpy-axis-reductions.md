---
lang: python
topic: numerical
tier: 2
tags: [numpy, reductions, axis]
note: axis is the axis that disappears; keepdims keeps it at length 1 so broadcasting still works.
---
import numpy as np

a = np.arange(24).reshape(2, 3, 4)
print(a.sum(axis=0).shape, a.sum(axis=(0, 2)).shape, a.sum(keepdims=True).shape)
print(a.mean(axis=1), a.std(axis=2).round(3))
centred = a - a.mean(axis=-1, keepdims=True)
print(np.allclose(centred.mean(axis=-1), 0))
print(a.argmax(axis=1), np.ptp(a, axis=0))
