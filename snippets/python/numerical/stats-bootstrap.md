---
lang: python
topic: numerical
tier: 3
tags: [statistics, bootstrap, confidence-interval]
note: Resample with replacement at the original size; the percentile spread is the interval.
---
import numpy as np

def bootstrap_ci(data, stat=np.mean, reps=5000, alpha=0.05, seed=0):
    rng = np.random.default_rng(seed)
    data = np.asarray(data)
    draws = rng.choice(data, size=(reps, len(data)), replace=True)
    boots = np.apply_along_axis(stat, 1, draws)
    lo, hi = np.quantile(boots, [alpha / 2, 1 - alpha / 2])
    return stat(data), lo, hi

rng = np.random.default_rng(1)
sample = rng.normal(5.0, 2.0, size=80)
point, lo, hi = bootstrap_ci(sample)
print(round(point, 3), round(lo, 3), round(hi, 3), lo < 5.0 < hi)
