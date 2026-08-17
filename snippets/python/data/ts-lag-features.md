---
lang: python
topic: data
tier: 3
tags: [time-series, feature-engineering, lags]
note: Every rolling feature must be shifted by one, or the row's own target is inside its own window.
---
import numpy as np
import pandas as pd

s = pd.Series(np.arange(1, 13, dtype=float),
              index=pd.date_range("2024-01-01", periods=12, freq="D"))
feat = pd.DataFrame({"y": s})
for lag in (1, 2, 7):
    feat[f"lag{lag}"] = s.shift(lag)
feat["roll3_mean"] = s.shift(1).rolling(3).mean()
feat["roll3_std"] = s.shift(1).rolling(3).std()
feat["dow"] = s.index.dayofweek
feat["ewm"] = s.shift(1).ewm(alpha=0.5).mean()
print(feat.tail(3).round(2))
print(feat.dropna().shape, feat.columns.tolist())
