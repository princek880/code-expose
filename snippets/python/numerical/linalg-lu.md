---
lang: python
topic: numerical
tier: 3
tags: [linalg, lu, doolittle]
note: Doolittle stores L below the diagonal and U on and above it, in one matrix if you want.
---
import numpy as np

def lu(A):
    n = len(A)
    L, U = np.eye(n), np.array(A, dtype=float)
    for col in range(n):
        for row in range(col + 1, n):
            factor = U[row, col] / U[col, col]
            L[row, col] = factor
            U[row] -= factor * U[col]
    return L, U

A = np.array([[4.0, 3], [6, 3]])
L, U = lu(A)
print(L.round(4), U.round(4), np.allclose(L @ U, A))
