---
lang: python
topic: nways
tier: 2
tags: [nways, matrix-multiply, numpy, blas]
note: The @ operator dispatches to BLAS; the triple loop is the same algorithm at roughly 100x the wall-clock cost.
---
import numpy as np

def multiply_naive(a, b):
    n, m, k = len(a), len(b[0]), len(b)
    c = [[0.0] * m for _ in range(n)]
    for i in range(n):
        for j in range(m):
            for p in range(k):
                c[i][j] += a[i][p] * b[p][j]
    return c

a = [[1.0, 2.0], [3.0, 4.0]]
b = [[5.0, 6.0], [7.0, 8.0]]
naive = multiply_naive(a, b)
via_blas = (np.array(a) @ np.array(b)).tolist()
print(naive, via_blas, np.allclose(naive, via_blas))
