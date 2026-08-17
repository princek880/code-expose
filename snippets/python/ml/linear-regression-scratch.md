---
lang: python
topic: ml
tier: 2
tags: [ml, linear-regression, normal-equation]
note: The normal equation is exact but O(d**3); gradient descent scales when d is large.
---
import numpy as np

def fit_normal(X, y):
    Xb = np.hstack([np.ones((len(X), 1)), X])
    return np.linalg.solve(Xb.T @ Xb, Xb.T @ y)

def fit_gd(X, y, lr=0.05, iters=5000):
    Xb = np.hstack([np.ones((len(X), 1)), X])
    w = np.zeros(Xb.shape[1])
    for _ in range(iters):
        w -= lr * Xb.T @ (Xb @ w - y) / len(y)
    return w

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 3))
y = X @ np.array([1.5, -2.0, 0.5]) + 4.0 + rng.normal(0, 0.1, 200)
print(fit_normal(X, y).round(3), np.allclose(fit_normal(X, y), fit_gd(X, y), atol=1e-3))
