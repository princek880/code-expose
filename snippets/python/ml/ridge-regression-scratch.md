---
lang: python
topic: ml
tier: 3
tags: [ml, ridge, regularization]
note: Never penalise the intercept: shrink it and the model can no longer centre the target.
---
import numpy as np

def ridge(X, y, alpha=1.0):
    Xb = np.hstack([np.ones((len(X), 1)), X])
    penalty = np.eye(Xb.shape[1]) * alpha
    penalty[0, 0] = 0.0
    return np.linalg.solve(Xb.T @ Xb + penalty, Xb.T @ y)

rng = np.random.default_rng(1)
X = rng.normal(size=(50, 8))
X[:, 1] = X[:, 0] + rng.normal(0, 1e-3, 50)
y = X @ np.arange(8) + rng.normal(0, 0.5, 50)
small, large = ridge(X, y, 1e-6), ridge(X, y, 10.0)
print(np.abs(small).max().round(2), np.abs(large).max().round(2))
print(np.linalg.norm(large[1:]) < np.linalg.norm(small[1:]))
