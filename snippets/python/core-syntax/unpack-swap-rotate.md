---
lang: python
topic: core-syntax
tier: 2
tags: [unpacking, tuple]
note: The right side is fully evaluated into a tuple before any name is rebound.
---
a, b, c = 1, 2, 3
a, b = b, a
a, b, c = c, a, b
xs = [1, 2, 3, 4]
xs[0], xs[-1] = xs[-1], xs[0]
(x, y), z = (a, b), c
print(a, b, c, xs, x, y, z)
