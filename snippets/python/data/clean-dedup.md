---
lang: python
topic: data
tier: 2
tags: [cleaning, duplicates]
note: keep="last" wins when later rows are corrections; subset decides what "same row" means.
---
import pandas as pd

df = pd.DataFrame({
    "id": [1, 2, 2, 3, 3],
    "email": ["a@x", "b@x", "b@x", "c@x", "c@y"],
    "updated": [1, 1, 2, 1, 2],
})
print(df.duplicated().sum(), df.duplicated(subset=["id"]).sum())
print(df.drop_duplicates(subset=["id"], keep="last"))
print(df.sort_values("updated").drop_duplicates("id", keep="last").sort_index())
print(df["email"].value_counts().loc[lambda s: s > 1].to_dict())
