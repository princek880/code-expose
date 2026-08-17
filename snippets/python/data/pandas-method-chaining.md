---
lang: python
topic: data
tier: 3
tags: [pandas, chaining, pipe]
note: One expression, no intermediate names, and every step is easy to comment out while debugging.
---
import pandas as pd

raw = pd.DataFrame({
    "name": [" Ann ", "bob", "CARL", "dee"],
    "sales": [100, 0, 250, 90],
    "region": ["n", "n", "s", "s"],
})
out = (
    raw
    .assign(name=lambda d: d["name"].str.strip().str.title())
    .query("sales > 0")
    .assign(share=lambda d: d["sales"] / d.groupby("region")["sales"].transform("sum"))
    .sort_values("share", ascending=False)
    .reset_index(drop=True)
)
print(out)
print(raw.pipe(lambda d: d.shape))
