---
lang: python
topic: ml
tier: 4
tags: [ml, svm, dual, kernel]
note: The dual depends on data only through the kernel, which is exactly what allows the kernel trick.
---
import numpy as np

def rbf(A, B, gamma=0.5):
    d2 = ((A[:, None, :] - B[None, :, :]) ** 2).sum(axis=2)
    return np.exp(-gamma * d2)

def fit_dual(X, y, C=1.0, lr=1e-3, iters=3000, gamma=0.5):
    K = rbf(X, X, gamma) * np.outer(y, y)
    alpha = np.zeros(len(y))
    for _ in range(iters):
        alpha = np.clip(alpha + lr * (1 - K @ alpha), 0, C)
    return alpha

def decide(X_train, y, alpha, X_query, gamma=0.5):
    return (alpha * y) @ rbf(X_train, X_query, gamma)

rng = np.random.default_rng(0)
X = np.vstack([rng.normal(-1.2, 0.5, (60, 2)), rng.normal(1.2, 0.5, (60, 2))])
y = np.r_[-np.ones(60), np.ones(60)]
a = fit_dual(X, y)
print((np.sign(decide(X, y, a, X)) == y).mean() > 0.95, (a > 1e-6).sum() <= len(y))
