---
lang: python
topic: numerical
tier: 2
tags: [numpy, reshape, transpose]
note: reshape needs a compatible stride layout; transpose only relabels axes, it copies nothing.
---
import numpy as np

a = np.arange(24)
b = a.reshape(2, 3, 4)
print(b.transpose(2, 0, 1).shape, b.swapaxes(0, 2).shape, b.T.shape)
print(b.reshape(-1, 4).shape, b.ravel().base is a)
print(np.ascontiguousarray(b.T).flags["C_CONTIGUOUS"])
print(b.reshape(6, 4)[::2].strides, b.squeeze().ndim)
