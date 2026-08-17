---
lang: python
topic: data
tier: 2
tags: [pandas, merge, join]
note: Pass indicator=True whenever a merge surprises you; it names which side each row came from.
---
import pandas as pd

left = pd.DataFrame({"id": [1, 2, 3], "name": ["a", "b", "c"]})
right = pd.DataFrame({"id": [2, 3, 4], "score": [20, 30, 40]})
print(pd.merge(left, right, on="id", how="inner"))
print(pd.merge(left, right, on="id", how="left"))
print(pd.merge(left, right, on="id", how="outer", indicator=True))
print(left.merge(right, on="id", how="right", suffixes=("_l", "_r")).shape)
print(left.set_index("id").join(right.set_index("id"), how="cross" if False else "left"))
