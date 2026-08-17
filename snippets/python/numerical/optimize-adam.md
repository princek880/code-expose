---
lang: python
topic: numerical
tier: 3
tags: [optimization, adam, bias-correction]
note: The bias correction matters most in the first few steps, when both moments start at zero.
---
import numpy as np

def adam(grad, x0, lr=0.1, b1=0.9, b2=0.999, eps=1e-8, iters=500):
    x = np.array(x0, dtype=float)
    m = np.zeros_like(x)
    v = np.zeros_like(x)
    for t in range(1, iters + 1):
        g = grad(x)
        m = b1 * m + (1 - b1) * g
        v = b2 * v + (1 - b2) * g ** 2
        mhat = m / (1 - b1 ** t)
        vhat = v / (1 - b2 ** t)
        x -= lr * mhat / (np.sqrt(vhat) + eps)
    return x

rosen_grad = lambda p: np.array([
    -400 * p[0] * (p[1] - p[0] ** 2) - 2 * (1 - p[0]),
    200 * (p[1] - p[0] ** 2),
])
print(adam(rosen_grad, [-1.2, 1.0], lr=0.02, iters=4000).round(4))
