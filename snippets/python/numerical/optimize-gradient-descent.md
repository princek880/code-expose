---
lang: python
topic: numerical
tier: 2
tags: [optimization, gradient-descent]
note: The step size decides everything: too small crawls, too large diverges along the steep axis.
---
import numpy as np

def gradient_descent(grad, x0, lr=0.1, iters=500, tol=1e-12):
    x = np.array(x0, dtype=float)
    for i in range(iters):
        g = grad(x)
        if np.linalg.norm(g) < tol:
            return x, i
        x -= lr * g
    return x, iters

quad_grad = lambda x: np.array([2 * (x[0] - 3), 20 * (x[1] + 1)])
x, steps = gradient_descent(quad_grad, [0.0, 0.0], lr=0.05)
print(x.round(8), steps)
