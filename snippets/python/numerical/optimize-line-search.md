---
lang: python
topic: numerical
tier: 3
tags: [optimization, line-search, armijo]
note: Backtracking halves the step until the Armijo condition holds, so it never needs the Hessian.
---
import numpy as np

def armijo(f, grad, x, d, alpha=1.0, c=1e-4, rho=0.5, max_back=60):
    fx, slope = f(x), grad(x) @ d
    for _ in range(max_back):
        if f(x + alpha * d) <= fx + c * alpha * slope:
            return alpha
        alpha *= rho
    return alpha

def descend(f, grad, x0, iters=200):
    x = np.array(x0, dtype=float)
    for _ in range(iters):
        d = -grad(x)
        x = x + armijo(f, grad, x, d) * d
    return x

f = lambda p: (p[0] - 1) ** 2 + 10 * (p[1] + 2) ** 2
g = lambda p: np.array([2 * (p[0] - 1), 20 * (p[1] + 2)])
print(descend(f, g, [5.0, 5.0]).round(8))
