---
lang: python
topic: numerical
tier: 3
tags: [optimization, momentum, nesterov]
note: Nesterov evaluates the gradient at the look-ahead point, which damps the overshoot.
---
import numpy as np

def momentum(grad, x0, lr=0.01, beta=0.9, iters=400):
    x, v = np.array(x0, dtype=float), np.zeros(len(x0))
    for _ in range(iters):
        v = beta * v + grad(x)
        x -= lr * v
    return x

def nesterov(grad, x0, lr=0.01, beta=0.9, iters=400):
    x, v = np.array(x0, dtype=float), np.zeros(len(x0))
    for _ in range(iters):
        v = beta * v + grad(x - lr * beta * v)
        x -= lr * v
    return x

g = lambda x: np.array([2 * (x[0] - 1), 4 * (x[1] + 2)])
print(momentum(g, [0.0, 0.0]).round(6), nesterov(g, [0.0, 0.0]).round(6))
