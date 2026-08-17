---
lang: python
topic: data
tier: 2
tags: [cleaning, missing, audit]
note: Audit missingness by column and by row before deciding anything; the pattern is the signal.
---
import numpy as np
import pandas as pd

rng = np.random.default_rng(0)
df = pd.DataFrame(rng.normal(size=(50, 4)), columns=list("abcd"))
df = df.mask(rng.random(df.shape) < 0.15)

report = pd.DataFrame({
    "nulls": df.isna().sum(),
    "pct": (df.isna().mean() * 100).round(1),
    "dtype": df.dtypes.astype(str),
})
print(report)
print(df.isna().sum(axis=1).value_counts().sort_index().to_dict())
print(df.dropna().shape, df.dropna(thresh=3).shape)
