---
lang: python
topic: numerical
tier: 4
tags: [numpy, strides, views]
note: sliding_window_view is a view: writing to it aliases the source in overlapping positions.
---
import numpy as np
from numpy.lib.stride_tricks import sliding_window_view, as_strided

a = np.arange(10)
w = sliding_window_view(a, 4)
print(w.shape, w[0], w.sum(axis=1))

s = as_strided(a, shape=(4, 3), strides=(a.itemsize, a.itemsize))
print(s, np.shares_memory(s, a))
print(sliding_window_view(np.arange(16).reshape(4, 4), (2, 2)).shape)
