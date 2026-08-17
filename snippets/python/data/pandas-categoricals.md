---
lang: python
topic: data
tier: 3
tags: [pandas, categorical, memory]
note: An ordered categorical sorts by its declared order, not alphabetically, and stores as small ints.
---
import pandas as pd

sizes = pd.Series(["m", "s", "l", "m", "xl"], dtype="category")
ordered = sizes.cat.set_categories(["s", "m", "l", "xl"], ordered=True)
print(sizes.dtype, ordered.sort_values().tolist())
print((ordered > "m").tolist(), ordered.cat.codes.tolist())
raw = pd.Series(["a"] * 1000 + ["b"] * 1000)
print(raw.memory_usage(deep=True) > raw.astype("category").memory_usage(deep=True))
