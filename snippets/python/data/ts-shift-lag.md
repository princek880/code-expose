---
lang: python
topic: data
tier: 2
tags: [time-series, shift, lag]
note: A lag feature must only look backwards; a negative shift leaks the future into training.
---
import pandas as pd

s = pd.Series([10, 12, 11, 15, 14], index=pd.date_range("2024-01-01", periods=5))
frame = pd.DataFrame({"y": s})
for lag in (1, 2):
    frame[f"lag{lag}"] = s.shift(lag)
frame["pct"] = s.pct_change().round(4)
frame["future"] = s.shift(-1)
print(frame)
print(frame[["y", "lag1"]].dropna().shape)
