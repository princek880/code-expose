---
lang: python
topic: ml
tier: 2
tags: [ml, kmeans, lloyd]
note: Lloyd's algorithm alternates assign and recentre; it converges but not necessarily to the optimum.
---
import numpy as np

def kmeans(X, k, iters=100, seed=0):
    rng = np.random.default_rng(seed)
    centres = X[rng.choice(len(X), k, replace=False)]
    for _ in range(iters):
        d = ((X[:, None, :] - centres[None, :, :]) ** 2).sum(axis=2)
        labels = d.argmin(axis=1)
        new = np.array([X[labels == j].mean(axis=0) if (labels == j).any() else centres[j]
                        for j in range(k)])
        if np.allclose(new, centres):
            break
        centres = new
    return centres, labels

rng = np.random.default_rng(1)
X = np.vstack([rng.normal([0, 0], 0.4, (120, 2)), rng.normal([4, 4], 0.4, (120, 2))])
centres, labels = kmeans(X, 2)
print(np.sort(centres[:, 0]).round(1), len(set(labels.tolist())))
