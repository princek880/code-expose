---
lang: python
topic: data
tier: 2
tags: [pandas, indexing, loc, iloc]
note: loc is label-based and end-inclusive; iloc is positional and end-exclusive. That asymmetry bites.
---
import pandas as pd

df = pd.DataFrame({"x": [1, 2, 3, 4], "y": [10, 20, 30, 40]}, index=["a", "b", "c", "d"])
print(df.loc["b":"c"])
print(df.iloc[1:3])
print(df.loc[df["x"] > 2, "y"].tolist(), df.at["a", "y"], df.iat[0, 1])
df.loc["b", "y"] = 99
print(df["y"].tolist(), df.loc[["a", "d"], ["y", "x"]].to_numpy().tolist())
