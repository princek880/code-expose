---
lang: python
topic: ml
tier: 2
tags: [ml, knn, distance]
note: kNN has no training step; all the cost is at query time, which is why indexes exist.
---
import numpy as np
from collections import Counter

def knn_predict(X_train, y_train, X_query, k=3):
    d = np.sqrt(((X_query[:, None, :] - X_train[None, :, :]) ** 2).sum(axis=2))
    idx = np.argsort(d, axis=1)[:, :k]
    return np.array([Counter(y_train[row].tolist()).most_common(1)[0][0] for row in idx])

rng = np.random.default_rng(0)
X = np.vstack([rng.normal(-2, 0.6, (60, 2)), rng.normal(2, 0.6, (60, 2))])
y = np.r_[np.zeros(60, int), np.ones(60, int)]
print((knn_predict(X, y, X, k=5) == y).mean() > 0.95)
print(knn_predict(X, y, np.array([[-2.0, -2.0], [2.0, 2.0]]), k=3))
