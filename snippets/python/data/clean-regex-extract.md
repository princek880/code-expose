---
lang: python
topic: data
tier: 3
tags: [cleaning, regex, extract]
note: Named groups become column names, and expand=True gives a DataFrame instead of tuples.
---
import pandas as pd

s = pd.Series(["order-1023 @ 2024-03-05", "order-77 @ 2023-12-31", "malformed"])
parts = s.str.extract(r"order-(?P<num>\d+) @ (?P<date>\d{4}-\d{2}-\d{2})")
print(parts)
print(parts["num"].astype("Int64").tolist())
print(s.str.contains(r"^order-\d+", regex=True).tolist())
print(s.str.findall(r"\d+").tolist())
print(s.str.replace(r"\d+", "#", regex=True).tolist())
