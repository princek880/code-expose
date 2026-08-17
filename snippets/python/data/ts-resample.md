---
lang: python
topic: data
tier: 2
tags: [time-series, resample, frequency]
note: Downsampling aggregates, upsampling leaves holes you must explicitly fill.
---
import numpy as np
import pandas as pd

idx = pd.date_range("2024-01-01", periods=48, freq="h")
s = pd.Series(np.arange(48, dtype=float), index=idx)
print(s.resample("D").agg(["sum", "mean", "max"]))
print(s.resample("6h").mean().head(4).round(1).tolist())
print(s.resample("30min").asfreq().isna().sum())
print(s.resample("30min").ffill().head(4).tolist())
