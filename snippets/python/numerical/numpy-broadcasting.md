---
lang: python
topic: numerical
tier: 2
tags: [numpy, broadcasting]
note: Shapes align from the right; a length-1 axis stretches, anything else is an error.
---
import numpy as np

a = np.arange(12).reshape(3, 4)
col = np.array([[10], [20], [30]])
row = np.array([1, 2, 3, 4])
print(a + col)
print(a * row)
print((a[:, None, :] + a[None, :, :]).shape)
print(np.broadcast_shapes((3, 1, 4), (1, 5, 4)))
