---
lang: python
topic: data
tier: 3
tags: [time-series, differencing, stationarity]
note: First differencing removes a linear trend; seasonal differencing at the period removes the cycle.
---
import numpy as np
import pandas as pd

t = np.arange(24)
series = pd.Series(0.5 * t + 3 * np.sin(2 * np.pi * t / 12) + 10.0)
d1 = series.diff().dropna()
seasonal = series.diff(12).dropna()
print(round(series.std(), 3), round(d1.std(), 3), round(seasonal.std(), 3))
print(round(d1.mean(), 3), np.allclose(series.diff().cumsum().dropna() + series.iloc[0], series[1:]))
