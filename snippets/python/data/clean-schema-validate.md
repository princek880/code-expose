---
lang: python
topic: data
tier: 3
tags: [cleaning, validation, schema]
note: Validate at the boundary and fail loudly; a silently wrong dtype propagates for hours.
---
import pandas as pd

SCHEMA = {"id": "int64", "name": "object", "score": "float64"}

def validate(df, schema=SCHEMA):
    problems = []
    missing = set(schema) - set(df.columns)
    if missing:
        problems.append(f"missing columns: {sorted(missing)}")
    for col, want in schema.items():
        if col in df.columns and str(df[col].dtype) != want:
            problems.append(f"{col}: expected {want}, got {df[col].dtype}")
    if df.index.duplicated().any():
        problems.append("duplicate index values")
    return problems

good = pd.DataFrame({"id": [1, 2], "name": ["a", "b"], "score": [1.0, 2.0]})
bad = pd.DataFrame({"id": ["1"], "score": [1.0]})
print(validate(good), validate(bad))
