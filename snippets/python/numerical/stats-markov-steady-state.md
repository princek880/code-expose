---
lang: python
topic: numerical
tier: 3
tags: [statistics, markov-chain, stationary]
note: The stationary vector is the left eigenvector for eigenvalue 1, normalised to sum to one.
---
import numpy as np

def steady_state_power(P, iters=10000):
    v = np.full(len(P), 1.0 / len(P))
    for _ in range(iters):
        v = v @ P
    return v

def steady_state_eig(P):
    vals, vecs = np.linalg.eig(P.T)
    v = np.real(vecs[:, np.argmin(np.abs(vals - 1))])
    return v / v.sum()

P = np.array([[0.9, 0.1, 0.0], [0.2, 0.7, 0.1], [0.1, 0.3, 0.6]])
a, b = steady_state_power(P), steady_state_eig(P)
print(a.round(5), np.allclose(a, b, atol=1e-6), round(a.sum(), 12))
