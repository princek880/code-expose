---
lang: python
topic: data
tier: 3
tags: [time-series, decomposition, seasonality]
note: Trend by centred moving average, seasonality by the mean of the detrended residual per phase.
---
import numpy as np
import pandas as pd

def decompose(s, period):
    trend = s.rolling(period, center=True, min_periods=period).mean()
    detrended = s - trend
    phase = np.arange(len(s)) % period
    seasonal_map = detrended.groupby(phase).mean()
    seasonal = pd.Series(seasonal_map.reindex(phase).to_numpy(), index=s.index)
    return trend, seasonal - seasonal.mean(), s - trend - seasonal

t = np.arange(48)
s = pd.Series(0.3 * t + 5 * np.sin(2 * np.pi * t / 12) + np.random.default_rng(0).normal(0, 0.3, 48))
trend, seasonal, resid = decompose(s, 12)
print(round(float(seasonal.abs().max()), 2), round(float(resid.std(skipna=True)), 2))
