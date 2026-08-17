---
lang: python
topic: data
tier: 3
tags: [time-series, validation, walk-forward]
note: Never shuffle a time series: every fold's training window must end before its test window starts.
---
import numpy as np

def walk_forward(n, initial, horizon, step=None):
    step = step or horizon
    folds, start = [], initial
    while start + horizon <= n:
        folds.append((np.arange(0, start), np.arange(start, start + horizon)))
        start += step
    return folds

folds = walk_forward(20, initial=10, horizon=3)
for train, test in folds:
    print(len(train), test[0], test[-1])
print(all(train[-1] < test[0] for train, test in folds))
