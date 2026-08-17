---
lang: python
topic: numerical
tier: 3
tags: [linalg, gaussian-elimination, pivoting]
note: Partial pivoting is not optional: without it a zero pivot divides by zero on exact input.
---
import numpy as np

def solve(A, b):
    M = np.hstack([A.astype(float), b.astype(float).reshape(-1, 1)])
    n = len(b)
    for col in range(n):
        pivot = np.argmax(np.abs(M[col:, col])) + col
        M[[col, pivot]] = M[[pivot, col]]
        M[col] /= M[col, col]
        for row in range(n):
            if row != col:
                M[row] -= M[row, col] * M[col]
    return M[:, -1]

A = np.array([[2.0, 1, -1], [-3, -1, 2], [-2, 1, 2]])
b = np.array([8.0, -11, -3])
print(solve(A, b).round(6), np.allclose(A @ solve(A, b), b))
