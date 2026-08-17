---
lang: python
topic: data
tier: 3
tags: [pandas, explode, nested]
note: explode repeats the other columns once per list element and keeps the original index.
---
import pandas as pd

df = pd.DataFrame({
    "order": [1, 2, 3],
    "items": [["pen", "ink"], ["pad"], []],
})
flat = df.explode("items")
print(flat)
print(flat.dropna(subset=["items"]).groupby("items").size().to_dict())
print(df.assign(n=lambda d: d["items"].str.len())["n"].tolist())
regrouped = flat.dropna(subset=["items"]).groupby("order")["items"].agg(list)
print(regrouped.to_dict())
