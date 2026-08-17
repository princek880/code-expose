---
lang: python
topic: data
tier: 4
tags: [time-series, cross-validation, rolling-origin]
note: A sliding window forgets old regimes; an expanding one assumes they still apply. Pick deliberately.
---
import numpy as np

def rolling_origin(n, window, horizon, expanding=False):
    folds, origin = [], window
    while origin + horizon <= n:
        lo = 0 if expanding else origin - window
        folds.append((np.arange(lo, origin), np.arange(origin, origin + horizon)))
        origin += horizon
    return folds

def score(series, folds, predict):
    errs = []
    for train, test in folds:
        pred = predict(series[train], len(test))
        errs.append(np.mean(np.abs(pred - series[test])))
    return float(np.mean(errs))

series = np.cumsum(np.random.default_rng(0).normal(0.2, 1.0, 60))
sliding = rolling_origin(60, 20, 5)
expanding = rolling_origin(60, 20, 5, expanding=True)
naive = lambda hist, k: np.repeat(hist[-1], k)
print(len(sliding), [len(t) for t, _ in expanding][:3])
print(round(score(series, sliding, naive), 3))
