---
lang: python
topic: data
tier: 3
tags: [pandas, multiindex, xs]
note: Use xs to slice one level without collapsing the rest, and swaplevel to reorder before sorting.
---
import pandas as pd

idx = pd.MultiIndex.from_product([["a", "b"], [1, 2]], names=["grp", "sub"])
df = pd.DataFrame({"v": [10, 20, 30, 40], "w": [1, 2, 3, 4]}, index=idx)
print(df)
print(df.xs("a", level="grp"))
print(df.xs(2, level="sub")["v"].tolist())
print(df.swaplevel().sort_index().index.tolist())
print(df.groupby(level="grp").sum().to_dict())
