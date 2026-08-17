---
lang: python
topic: numerical
tier: 3
tags: [linalg, eigenvalue, power-iteration]
note: Power iteration converges to the dominant eigenvector at a rate set by the eigenvalue gap.
---
import numpy as np

def dominant(A, iters=500, tol=1e-12):
    v = np.ones(len(A)) / np.sqrt(len(A))
    lam = 0.0
    for _ in range(iters):
        w = A @ v
        nxt = np.linalg.norm(w)
        v_new = w / nxt
        if abs(nxt - lam) < tol:
            return nxt, v_new
        lam, v = nxt, v_new
    return lam, v

A = np.array([[2.0, 1], [1, 3]])
lam, v = dominant(A)
print(round(lam, 6), np.allclose(A @ v, lam * v, atol=1e-6))
print(sorted(np.linalg.eigvals(A).round(6)))
