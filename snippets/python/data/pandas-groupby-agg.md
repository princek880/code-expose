---
lang: python
topic: data
tier: 2
tags: [pandas, groupby, agg]
note: Named aggregation gives flat column names, which saves you from a MultiIndex you did not want.
---
import pandas as pd

df = pd.DataFrame({
    "team": ["a", "b", "a", "b", "c"],
    "score": [10, 20, 30, 40, 50],
    "cost": [1.5, 2.5, 3.5, 4.5, 5.5],
})
print(df.groupby("team")["score"].agg(["sum", "mean", "count"]))
print(df.groupby("team").agg(total=("score", "sum"), worst=("cost", "max")))
print(df.groupby("team")["score"].transform("mean").tolist())
print(df.groupby("team", as_index=False)["cost"].sum())
