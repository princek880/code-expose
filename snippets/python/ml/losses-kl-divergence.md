---
lang: python
topic: ml
tier: 3
tags: [ml, kl-divergence, softmax]
note: KL is not symmetric, and it is infinite wherever p is positive and q is zero.
---
import numpy as np

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def kl(p, q, eps=1e-12):
    p, q = np.clip(p, eps, 1), np.clip(q, eps, 1)
    return float((p * np.log(p / q)).sum())

def js(p, q):
    m = (p + q) / 2
    return 0.5 * kl(p, m) + 0.5 * kl(q, m)

p = softmax(np.array([2.0, 1.0, 0.1]))
q = softmax(np.array([1.0, 1.0, 1.0]))
print(p.round(4), round(kl(p, q), 4), round(kl(q, p), 4))
print(round(js(p, q), 4), kl(p, q) != kl(q, p), abs(kl(p, p)) < 1e-9)
