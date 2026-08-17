---
lang: python
topic: numerical
tier: 2
tags: [numpy, masking]
note: A boolean index returns a copy; a slice returns a view. Assignment through either writes back.
---
import numpy as np

a = np.arange(-5, 6)
mask = (a % 2 == 0) & (a > -4)
print(a[mask], mask.sum(), np.flatnonzero(mask))
a[a < 0] = 0
print(a)
b = np.arange(9).reshape(3, 3)
b[b % 3 == 0] *= -1
print(b, np.count_nonzero(b < 0))
