---
lang: python
topic: data
tier: 2
tags: [cleaning, datetime, parsing]
note: errors="coerce" turns unparseable values into NaT instead of aborting the whole column.
---
import pandas as pd

raw = pd.Series(["2024-03-05", "March 5, 2024", "not a date", "2024-03-05 14:30"])
parsed = pd.to_datetime(raw, errors="coerce", format="mixed")
print(parsed.tolist())
print(parsed.isna().sum(), parsed.dt.year.tolist())
print(parsed.dt.strftime("%Y-W%V").tolist())
print(parsed.dt.dayofweek.tolist(), parsed.dt.is_month_end.tolist())
