---
lang: python
topic: numerical
tier: 3
tags: [linalg, iterative-solver, jacobi]
note: Jacobi uses the previous sweep everywhere; Gauss-Seidel reuses updates within the sweep.
---
import numpy as np

def jacobi(A, b, iters=200):
    D = np.diag(A)
    R = A - np.diag(D)
    x = np.zeros_like(b, dtype=float)
    for _ in range(iters):
        x = (b - R @ x) / D
    return x

def gauss_seidel(A, b, iters=200):
    n, x = len(b), np.zeros_like(b, dtype=float)
    for _ in range(iters):
        for i in range(n):
            x[i] = (b[i] - A[i, :i] @ x[:i] - A[i, i + 1:] @ x[i + 1:]) / A[i, i]
    return x

A = np.array([[4.0, -1, 0], [-1, 4, -1], [0, -1, 3]])
b = np.array([15.0, 10, 10])
print(jacobi(A, b).round(6), np.allclose(jacobi(A, b), gauss_seidel(A, b)))
