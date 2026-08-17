---
lang: python
topic: data
tier: 3
tags: [pandas, groupby, multiindex]
note: Grouping on two keys gives a MultiIndex; unstack turns the inner level into columns.
---
import pandas as pd

df = pd.DataFrame({
    "region": ["n", "n", "s", "s", "n", "s"],
    "quarter": ["q1", "q2", "q1", "q2", "q1", "q1"],
    "revenue": [100, 120, 90, 95, 40, 60],
})
grouped = df.groupby(["region", "quarter"])["revenue"].sum()
print(grouped)
print(grouped.unstack(fill_value=0))
print(grouped.groupby(level="region").rank(ascending=False).tolist())
print(df.groupby(["region", "quarter"]).size().reset_index(name="n"))
