---
lang: python
topic: data
tier: 3
tags: [time-series, autoregression, least-squares]
note: An AR(p) fit is just least squares on lagged columns; the I in ARIMA is the differencing you did first.
---
import numpy as np

def fit_ar(x, p):
    x = np.asarray(x, dtype=float)
    X = np.column_stack([x[p - k - 1:-k - 1] for k in range(p)])
    X = np.hstack([np.ones((len(X), 1)), X])
    coef, *_ = np.linalg.lstsq(X, x[p:], rcond=None)
    return coef

def forecast(x, coef, steps):
    p = len(coef) - 1
    hist = list(np.asarray(x, dtype=float)[-p:])
    out = []
    for _ in range(steps):
        nxt = coef[0] + sum(coef[k + 1] * hist[-k - 1] for k in range(p))
        hist.append(nxt)
        out.append(nxt)
    return np.array(out)

rng = np.random.default_rng(0)
x = np.zeros(400)
for i in range(1, 400):
    x[i] = 0.6 * x[i - 1] + rng.normal()
coef = fit_ar(x, 2)
print(coef.round(3), forecast(x, coef, 3).round(3))
