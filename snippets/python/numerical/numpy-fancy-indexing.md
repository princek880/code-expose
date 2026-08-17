---
lang: python
topic: numerical
tier: 3
tags: [numpy, fancy-indexing]
note: Integer arrays broadcast against each other, so the result shape is the index shape.
---
import numpy as np

a = np.arange(20).reshape(4, 5)
rows = np.array([0, 2, 3])
cols = np.array([1, 4, 0])
print(a[rows, cols])
print(a[rows[:, None], cols[None, :]])
print(a[np.ix_(rows, cols)])
print(np.take_along_axis(a, a.argmax(axis=1)[:, None], axis=1).ravel())
