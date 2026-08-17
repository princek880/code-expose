---
lang: python
topic: data
tier: 3
tags: [cleaning, timezone, utc]
note: Store UTC, convert only at the edges; a naive timestamp is a bug waiting for a DST boundary.
---
import pandas as pd

naive = pd.to_datetime(["2024-03-10 01:30", "2024-11-03 01:30"])
localised = naive.tz_localize("UTC").tz_convert("America/New_York")
print(localised.tolist())
print(localised.tz_convert("UTC").tolist())
s = pd.Series(pd.to_datetime(["2024-06-01 12:00"]).tz_localize("Europe/London"))
print(s.dt.tz, s.dt.tz_convert("UTC").dt.hour.tolist())
