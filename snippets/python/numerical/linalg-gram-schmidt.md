---
lang: python
topic: numerical
tier: 3
tags: [linalg, qr, gram-schmidt]
note: Modified Gram-Schmidt subtracts as it goes, which loses far less orthogonality than classical.
---
import numpy as np

def qr(A):
    A = np.array(A, dtype=float)
    n, m = A.shape
    Q, R = np.zeros((n, m)), np.zeros((m, m))
    for j in range(m):
        v = A[:, j].copy()
        for i in range(j):
            R[i, j] = Q[:, i] @ v
            v -= R[i, j] * Q[:, i]
        R[j, j] = np.linalg.norm(v)
        Q[:, j] = v / R[j, j]
    return Q, R

A = np.array([[1.0, 1, 0], [1, 0, 1], [0, 1, 1]])
Q, R = qr(A)
print(np.allclose(Q @ R, A), np.allclose(Q.T @ Q, np.eye(3)))
