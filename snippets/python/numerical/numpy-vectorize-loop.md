---
lang: python
topic: numerical
tier: 2
tags: [numpy, vectorization]
note: The vectorized form allocates once and runs in C; the loop pays interpreter cost per element.
---
import numpy as np

def loop_version(xs, ys):
    out = np.empty(len(xs))
    for i in range(len(xs)):
        out[i] = xs[i] ** 2 + 3 * ys[i] - 1
    return out

def vector_version(xs, ys):
    return xs ** 2 + 3 * ys - 1

xs, ys = np.linspace(0, 1, 8), np.linspace(1, 2, 8)
print(np.allclose(loop_version(xs, ys), vector_version(xs, ys)))
print(np.abs(vector_version(xs, ys)).max())
