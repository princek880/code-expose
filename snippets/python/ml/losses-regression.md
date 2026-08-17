---
lang: python
topic: ml
tier: 2
tags: [ml, loss, huber]
note: Huber is quadratic near zero and linear in the tail, so one outlier cannot dominate the gradient.
---
import numpy as np

def mse(y, p):
    return float(((y - p) ** 2).mean())

def mae(y, p):
    return float(np.abs(y - p).mean())

def huber(y, p, delta=1.0):
    r = np.abs(y - p)
    quad = 0.5 * r ** 2
    lin = delta * (r - 0.5 * delta)
    return float(np.where(r <= delta, quad, lin).mean())

y = np.array([1.0, 2.0, 3.0, 4.0])
p = np.array([1.1, 1.9, 3.2, 40.0])
print(round(mse(y, p), 2), round(mae(y, p), 2), round(huber(y, p), 2))
print(huber(y, p) < mse(y, p))
