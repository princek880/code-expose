---
lang: python
topic: numerical
tier: 2
tags: [numpy, where, select]
note: where evaluates both branches; select takes the first true condition in order.
---
import numpy as np

x = np.linspace(-2, 2, 9)
print(np.where(x > 0, x, -x))
print(np.select([x < -1, x < 1], [-1, 0], default=1))
print(np.piecewise(x, [x < 0, x >= 0], [lambda v: v ** 2, lambda v: v]))
print(np.clip(x, -0.5, 0.5).round(2), np.sign(x).astype(int))
