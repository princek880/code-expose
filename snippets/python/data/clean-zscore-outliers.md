---
lang: python
topic: data
tier: 2
tags: [cleaning, outliers, zscore, mad]
note: The modified z-score uses the median and MAD, so a single huge value cannot hide itself.
---
import numpy as np
import pandas as pd

s = pd.Series([10.0, 11, 12, 11, 13, 12, 200, 9, 11])
z = (s - s.mean()) / s.std(ddof=0)
mad = (s - s.median()).abs().median()
robust = 0.6745 * (s - s.median()) / mad
print(z.round(2).tolist())
print(robust.round(2).tolist())
print((z.abs() > 3).sum(), (robust.abs() > 3.5).sum())
