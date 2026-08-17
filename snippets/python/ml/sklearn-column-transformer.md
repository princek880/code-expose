---
lang: python
topic: ml
tier: 3
tags: [sklearn, column-transformer, preprocessing]
note: ColumnTransformer routes each column group to its own encoder and concatenates the result.
---
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

numeric = Pipeline([("impute", SimpleImputer(strategy="median")), ("scale", StandardScaler())])
categorical = Pipeline([
    ("impute", SimpleImputer(strategy="most_frequent")),
    ("hot", OneHotEncoder(handle_unknown="ignore", sparse_output=False)),
])
pre = ColumnTransformer([("num", numeric, [0, 1]), ("cat", categorical, [2])])

X = np.array([[1.0, 2.0, 0], [np.nan, 3.0, 1], [3.0, np.nan, 1], [4.0, 5.0, 2]])
out = pre.fit_transform(X)
print(out.shape, out[:, :2].mean(axis=0).round(6))
