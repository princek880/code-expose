---
lang: python
topic: numerical
tier: 3
tags: [numpy, meshgrid, grid]
note: indexing="ij" matches matrix convention; the default "xy" swaps the first two axes.
---
import numpy as np

xs = np.linspace(-1, 1, 5)
ys = np.linspace(0, 2, 3)
X, Y = np.meshgrid(xs, ys, indexing="xy")
print(X.shape, Y.shape)
Z = np.exp(-(X ** 2 + Y ** 2))
print(Z.shape, Z.max().round(4), np.unravel_index(Z.argmax(), Z.shape))
I, J = np.meshgrid(xs, ys, indexing="ij")
print(I.shape, np.allclose(I, X.T))
