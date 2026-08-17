---
lang: python
topic: ml
tier: 3
tags: [ml, logistic-regression, sigmoid]
note: The gradient of log-loss with a sigmoid is X.T @ (sigma(Xw) - y): no sigmoid derivative survives.
---
import numpy as np

def sigmoid(z):
    return np.where(z >= 0, 1 / (1 + np.exp(-z)), np.exp(z) / (1 + np.exp(z)))

def fit(X, y, lr=0.2, iters=4000):
    Xb = np.hstack([np.ones((len(X), 1)), X])
    w = np.zeros(Xb.shape[1])
    for _ in range(iters):
        w -= lr * Xb.T @ (sigmoid(Xb @ w) - y) / len(y)
    return w

def predict(X, w):
    return (sigmoid(np.hstack([np.ones((len(X), 1)), X]) @ w) >= 0.5).astype(int)

rng = np.random.default_rng(0)
X = np.vstack([rng.normal(-1.5, 1, (150, 2)), rng.normal(1.5, 1, (150, 2))])
y = np.r_[np.zeros(150), np.ones(150)]
w = fit(X, y)
print(w.round(3), (predict(X, w) == y).mean() > 0.94)
