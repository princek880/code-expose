---
lang: python
topic: data
tier: 4
tags: [time-series, acf, pacf, durbin-levinson]
note: PACF strips the shorter lags out, which is why an AR(p) process cuts off at exactly lag p.
---
import numpy as np

def acf(x, nlags=10):
    x = np.asarray(x, dtype=float)
    x = x - x.mean()
    denom = (x ** 2).sum()
    return np.array([1.0] + [(x[k:] * x[:-k]).sum() / denom for k in range(1, nlags + 1)])

def pacf(x, nlags=10):
    r = acf(x, nlags)
    phi = np.zeros((nlags + 1, nlags + 1))
    out = [1.0]
    phi[1, 1] = r[1]
    out.append(r[1])
    for k in range(2, nlags + 1):
        num = r[k] - sum(phi[k - 1, j] * r[k - j] for j in range(1, k))
        den = 1 - sum(phi[k - 1, j] * r[j] for j in range(1, k))
        phi[k, k] = num / den
        for j in range(1, k):
            phi[k, j] = phi[k - 1, j] - phi[k, k] * phi[k - 1, k - j]
        out.append(phi[k, k])
    return np.array(out)

rng = np.random.default_rng(0)
e = rng.normal(size=500)
x = np.zeros(500)
for i in range(1, 500):
    x[i] = 0.7 * x[i - 1] + e[i]
print(acf(x, 4).round(3), pacf(x, 4).round(3))
