---
lang: python
topic: ml
tier: 3
tags: [ml, loss, cross-entropy, focal]
note: Clip probabilities before the log, or a confident wrong prediction returns infinity.
---
import numpy as np

def cross_entropy(y, p, eps=1e-12):
    p = np.clip(p, eps, 1 - eps)
    return float(-(y * np.log(p) + (1 - y) * np.log(1 - p)).mean())

def hinge(y_pm1, scores):
    return float(np.maximum(0, 1 - y_pm1 * scores).mean())

def focal(y, p, gamma=2.0, eps=1e-12):
    p = np.clip(p, eps, 1 - eps)
    pt = np.where(y == 1, p, 1 - p)
    return float((-(1 - pt) ** gamma * np.log(pt)).mean())

y = np.array([1.0, 0, 1, 0])
p = np.array([0.9, 0.2, 0.55, 0.4])
print(round(cross_entropy(y, p), 4), round(focal(y, p), 4))
print(round(hinge(np.array([1.0, -1, 1, -1]), np.array([2.0, -0.5, 0.3, 1.2])), 4))
