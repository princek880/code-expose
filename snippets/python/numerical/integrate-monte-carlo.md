---
lang: python
topic: numerical
tier: 3
tags: [integration, monte-carlo, variance]
note: Error falls like 1/sqrt(n) regardless of dimension, which is why it wins in high dimensions.
---
import numpy as np

def mc_integrate(f, lo, hi, n=100000, seed=0):
    rng = np.random.default_rng(seed)
    lo, hi = np.atleast_1d(lo), np.atleast_1d(hi)
    pts = rng.uniform(lo, hi, size=(n, len(lo)))
    vals = f(pts)
    volume = np.prod(hi - lo)
    return volume * vals.mean(), volume * vals.std(ddof=1) / np.sqrt(n)

est, err = mc_integrate(lambda p: np.exp(-(p ** 2).sum(axis=1)), [-2, -2], [2, 2])
print(f"{est:.5f} +- {err:.5f}")
sphere, _ = mc_integrate(lambda p: ((p ** 2).sum(axis=1) <= 1).astype(float), [-1] * 3, [1] * 3)
print(f"{sphere:.4f}", f"{4 / 3 * np.pi:.4f}")
