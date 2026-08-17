---
lang: python
topic: data
tier: 3
tags: [time-series, exponential-smoothing, holt]
note: Holt adds a trend term, so the forecast keeps climbing instead of flattening immediately.
---
import numpy as np

def simple_exp(x, alpha):
    out = [float(x[0])]
    for v in x[1:]:
        out.append(alpha * v + (1 - alpha) * out[-1])
    return np.array(out)

def holt(x, alpha=0.5, beta=0.3):
    level, trend = float(x[0]), float(x[1] - x[0])
    out = [level]
    for v in x[1:]:
        prev = level
        level = alpha * v + (1 - alpha) * (level + trend)
        trend = beta * (level - prev) + (1 - beta) * trend
        out.append(level)
    return np.array(out), level, trend

x = np.array([10.0, 12, 13, 16, 18, 21, 23])
print(simple_exp(x, 0.4).round(2))
fit, level, trend = holt(x)
print(fit.round(2), round(level + 2 * trend, 2))
