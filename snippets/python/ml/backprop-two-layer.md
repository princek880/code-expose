---
lang: python
topic: ml
tier: 4
tags: [ml, backprop, chain-rule]
note: Backward is the forward graph reversed: each layer receives dL/dout and returns dL/din.
---
import numpy as np

def train(X, y, hidden=16, lr=0.1, epochs=3000, seed=0):
    rng = np.random.default_rng(seed)
    W1 = rng.normal(0, 0.5, (X.shape[1], hidden))
    b1 = np.zeros(hidden)
    W2 = rng.normal(0, 0.5, (hidden, 1))
    b2 = np.zeros(1)
    for _ in range(epochs):
        h = np.tanh(X @ W1 + b1)
        out = h @ W2 + b2
        d_out = 2 * (out - y[:, None]) / len(y)
        d_W2 = h.T @ d_out
        d_b2 = d_out.sum(axis=0)
        d_h = d_out @ W2.T * (1 - h ** 2)
        d_W1 = X.T @ d_h
        d_b1 = d_h.sum(axis=0)
        W1 -= lr * d_W1
        b1 -= lr * d_b1
        W2 -= lr * d_W2
        b2 -= lr * d_b2
    return lambda Z: (np.tanh(Z @ W1 + b1) @ W2 + b2).ravel()

X = np.array([[0.0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([0.0, 1, 1, 0])
f = train(X, y)
print(f(X).round(2), np.abs(f(X) - y).max() < 0.1)
