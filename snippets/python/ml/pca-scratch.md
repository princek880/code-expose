---
lang: python
topic: ml
tier: 3
tags: [ml, pca, svd]
note: Centre first or the first component just points at the mean; SVD beats forming the covariance.
---
import numpy as np

def pca(X, k=2):
    Xc = X - X.mean(axis=0)
    U, s, Vt = np.linalg.svd(Xc, full_matrices=False)
    explained = s ** 2 / (s ** 2).sum()
    return Xc @ Vt[:k].T, Vt[:k], explained[:k]

rng = np.random.default_rng(0)
base = rng.normal(size=(300, 2)) @ np.array([[3.0, 1.0], [0.0, 0.2]])
X = np.hstack([base, base @ np.array([[0.5], [0.5]]) + rng.normal(0, 0.01, (300, 1))])
scores, comps, ev = pca(X, 2)
print(scores.shape, ev.round(3), ev.sum() > 0.99)
