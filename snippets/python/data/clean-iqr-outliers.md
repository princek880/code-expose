---
lang: python
topic: data
tier: 2
tags: [cleaning, outliers, iqr]
note: The IQR rule is distribution-free, which is why it survives the skew that z-scores do not.
---
import numpy as np
import pandas as pd

s = pd.Series([10, 11, 12, 11, 13, 12, 200, 9, 11, -80])
q1, q3 = s.quantile([0.25, 0.75])
iqr = q3 - q1
lo, hi = q1 - 1.5 * iqr, q3 + 1.5 * iqr
mask = (s < lo) | (s > hi)
print(round(q1, 2), round(q3, 2), round(iqr, 2))
print(s[mask].tolist(), mask.sum())
print(s.clip(lo, hi).tolist())
