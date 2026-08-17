---
lang: python
topic: numerical
tier: 3
tags: [linalg, svd, condition-number]
note: The condition number is the ratio of extreme singular values, and it bounds the error growth.
---
import numpy as np

A = np.array([[1.0, 2, 3], [4, 5, 6], [7, 8, 9.0001]])
U, s, Vt = np.linalg.svd(A)
print(s.round(4), U.shape, Vt.shape)
print(np.allclose(U @ np.diag(s) @ Vt, A))
print(f"{s[0] / s[-1]:.4g}", f"{np.linalg.cond(A):.4g}")
rank_1 = np.outer(U[:, 0], Vt[0]) * s[0]
print(np.linalg.norm(A - rank_1) / np.linalg.norm(A))
