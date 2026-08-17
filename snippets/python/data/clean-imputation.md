---
lang: python
topic: data
tier: 2
tags: [cleaning, imputation, missing]
note: Add an indicator column when you impute: "was missing" is often the strongest feature.
---
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "x": [1.0, np.nan, 3.0, np.nan, 5.0],
    "grp": ["a", "a", "b", "b", "b"],
})
print(df.assign(was_null=lambda d: d["x"].isna()))
print(df["x"].fillna(df["x"].median()).tolist())
print(df["x"].ffill().tolist(), df["x"].bfill().tolist())
print(df.groupby("grp")["x"].transform(lambda s: s.fillna(s.mean())).tolist())
print(df["x"].interpolate().round(2).tolist())
