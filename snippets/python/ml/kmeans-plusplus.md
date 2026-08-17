---
lang: python
topic: ml
tier: 3
tags: [ml, kmeans, initialization]
note: k-means++ samples each new centre proportional to squared distance, which kills bad seeds.
---
import numpy as np

def kmeans_plusplus(X, k, seed=0):
    rng = np.random.default_rng(seed)
    centres = [X[rng.integers(len(X))]]
    for _ in range(k - 1):
        d2 = np.min(((X[:, None, :] - np.array(centres)[None]) ** 2).sum(axis=2), axis=1)
        probs = d2 / d2.sum()
        centres.append(X[rng.choice(len(X), p=probs)])
    return np.array(centres)

rng = np.random.default_rng(2)
X = np.vstack([rng.normal([0, 0], 0.3, (100, 2)),
               rng.normal([5, 0], 0.3, (100, 2)),
               rng.normal([0, 5], 0.3, (100, 2))])
c = kmeans_plusplus(X, 3)
spread = ((c[:, None, :] - c[None, :, :]) ** 2).sum(axis=2)
print(c.shape, spread[np.triu_indices(3, 1)].min() > 4)
