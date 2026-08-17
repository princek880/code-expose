---
lang: python
topic: numerical
tier: 4
tags: [numpy, einsum, tensor]
note: Repeated indices contract, omitted output indices sum out. That is the whole rule.
---
import numpy as np

A = np.arange(6).reshape(2, 3).astype(float)
B = np.arange(12).reshape(3, 4).astype(float)
v = np.arange(3).astype(float)

print(np.allclose(np.einsum("ij,jk->ik", A, B), A @ B))
print(np.allclose(np.einsum("ij,j->i", A, v), A @ v))
print(np.allclose(np.einsum("ii->i", np.eye(3)), np.ones(3)))
print(np.allclose(np.einsum("ij->", A), A.sum()))
print(np.einsum("ij,ij->i", A, A))
print(np.einsum("i,j->ij", v, v).shape)
