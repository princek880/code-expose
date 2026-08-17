---
lang: python
topic: data
tier: 3
tags: [pandas, dtypes, memory]
note: Downcast only after you know the value range; int8 silently cannot hold 200.
---
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "small": np.arange(100, dtype="int64"),
    "ratio": np.linspace(0, 1, 100).astype("float64"),
    "flag": np.random.default_rng(0).integers(0, 2, 100).astype("int64"),
})
before = df.memory_usage(deep=True).sum()
tight = df.assign(
    small=lambda d: pd.to_numeric(d["small"], downcast="unsigned"),
    ratio=lambda d: pd.to_numeric(d["ratio"], downcast="float"),
    flag=lambda d: d["flag"].astype("bool"),
)
print(dict(tight.dtypes.astype(str)), tight.memory_usage(deep=True).sum() < before)
