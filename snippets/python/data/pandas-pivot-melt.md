---
lang: python
topic: data
tier: 2
tags: [pandas, pivot, melt, reshape]
note: pivot needs unique index/column pairs; pivot_table aggregates duplicates instead of raising.
---
import pandas as pd

long = pd.DataFrame({
    "day": ["mon", "mon", "tue", "tue"],
    "metric": ["hits", "errs", "hits", "errs"],
    "value": [100, 2, 130, 5],
})
wide = long.pivot(index="day", columns="metric", values="value")
print(wide)
print(wide.reset_index().melt(id_vars="day", var_name="metric", value_name="value"))
print(long.pivot_table(index="day", columns="metric", values="value", aggfunc="sum"))
