---
lang: python
topic: numerical
tier: 4
tags: [integration, gauss-legendre, quadrature]
note: n nodes integrate polynomials up to degree 2n-1 exactly, after mapping [a,b] to [-1,1].
---
import numpy as np

def gauss_legendre(f, a, b, n=5):
    nodes, weights = np.polynomial.legendre.leggauss(n)
    mid, half = (a + b) / 2, (b - a) / 2
    return half * np.sum(weights * np.array([f(mid + half * x) for x in nodes]))

print(f"{gauss_legendre(np.sin, 0, np.pi, 5):.12f}")
print(f"{gauss_legendre(lambda x: x ** 5 - 3 * x ** 2, -1, 2, 3):.12f}")
print(f"{gauss_legendre(np.exp, 0, 1, 8) - (np.e - 1):.2e}")
