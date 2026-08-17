---
lang: python
topic: numerical
tier: 3
tags: [optimization, newton, hessian]
note: Newton's step solves H d = -g, so it needs a positive-definite Hessian to point downhill.
---
import numpy as np

def newton_min(grad, hess, x0, iters=50, tol=1e-13):
    x = np.array(x0, dtype=float)
    for i in range(iters):
        g = grad(x)
        if np.linalg.norm(g) < tol:
            return x, i
        x -= np.linalg.solve(hess(x), g)
    return x, iters

grad = lambda p: np.array([4 * p[0] ** 3 - 4 * p[0] + p[1], p[0] + 2 * p[1]])
hess = lambda p: np.array([[12 * p[0] ** 2 - 4, 1.0], [1.0, 2.0]])
x, steps = newton_min(grad, hess, [1.5, -0.5])
print(x.round(8), steps, np.linalg.norm(grad(x)) < 1e-10)
