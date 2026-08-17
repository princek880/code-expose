---
lang: python
topic: data
tier: 2
tags: [time-series, rolling, window]
note: min_periods decides how much of the leading NaN ramp you keep; center shifts the label.
---
import numpy as np
import pandas as pd

idx = pd.date_range("2024-01-01", periods=10, freq="D")
s = pd.Series([1, 3, 2, 8, 5, 4, 9, 7, 6, 10], index=idx, dtype=float)
print(s.rolling(3).mean().round(2).tolist())
print(s.rolling(3, min_periods=1).mean().round(2).tolist())
print(s.rolling(3, center=True).max().tolist())
print(s.rolling("3D").sum().tolist())
print(s.expanding().mean().round(2).tolist())
