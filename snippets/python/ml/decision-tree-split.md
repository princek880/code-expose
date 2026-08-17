---
lang: python
topic: ml
tier: 3
tags: [ml, decision-tree, gini, entropy]
note: Both criteria reward pure children; gini is cheaper because it avoids the logarithm.
---
import numpy as np

def gini(y):
    if len(y) == 0:
        return 0.0
    p = np.bincount(y) / len(y)
    return 1.0 - (p ** 2).sum()

def entropy(y):
    if len(y) == 0:
        return 0.0
    p = np.bincount(y) / len(y)
    p = p[p > 0]
    return float(-(p * np.log2(p)).sum())

def best_split(X, y, criterion=gini):
    best = (np.inf, None, None)
    for col in range(X.shape[1]):
        for thr in np.unique(X[:, col]):
            left = X[:, col] <= thr
            n = len(y)
            score = left.sum() / n * criterion(y[left]) + (~left).sum() / n * criterion(y[~left])
            if score < best[0]:
                best = (score, col, float(thr))
    return best

rng = np.random.default_rng(0)
X = np.vstack([rng.normal(0, 1, (80, 2)), rng.normal(4, 1, (80, 2))])
y = np.r_[np.zeros(80, int), np.ones(80, int)]
print(best_split(X, y)[1:], round(gini(y), 3), round(entropy(y), 3))
