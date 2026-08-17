---
lang: python
topic: data
tier: 3
tags: [pandas, vectorization, apply]
note: apply loops in Python per row; the vectorized form does the same work in one C pass.
---
import numpy as np
import pandas as pd

df = pd.DataFrame({"a": np.arange(1, 6), "b": np.arange(10, 15)})

slow = df.apply(lambda r: r["a"] * 2 + r["b"] if r["a"] % 2 else r["b"], axis=1)
fast = np.where(df["a"] % 2 == 1, df["a"] * 2 + df["b"], df["b"])
print(slow.tolist(), list(fast), (slow.to_numpy() == fast).all())

print(df["a"].map(lambda v: v ** 2).tolist())
print(df.map(lambda v: v + 1).to_numpy().sum())
