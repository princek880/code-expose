---
lang: python
topic: data
tier: 2
tags: [pandas, query, assign]
note: query reads column names bare and @ escapes into local variables.
---
import pandas as pd

df = pd.DataFrame({
    "price": [10.0, 25.0, 5.0, 40.0],
    "qty": [3, 1, 10, 2],
    "tag": ["x", "y", "x", "y"],
})
limit = 20.0
print(df.query("price > @limit and qty < 3"))
print(df.query("tag in ['x'] or qty >= 10").shape)
print(df.assign(total=lambda d: d["price"] * d["qty"],
                pricey=lambda d: d["total"] > 50).sort_values("total"))
