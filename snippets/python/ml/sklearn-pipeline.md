---
lang: python
topic: ml
tier: 2
tags: [sklearn, pipeline, leakage]
note: Fitting the scaler inside the pipeline is what stops test statistics leaking into training.
---
import numpy as np
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import LogisticRegression

pipe = Pipeline([
    ("scale", StandardScaler()),
    ("poly", PolynomialFeatures(degree=2, include_bias=False)),
    ("clf", LogisticRegression(max_iter=1000)),
])

rng = np.random.default_rng(0)
X = rng.normal(size=(300, 3))
y = ((X ** 2).sum(axis=1) > 3).astype(int)
pipe.fit(X, y)
print(round(pipe.score(X, y), 3), pipe.named_steps["poly"].n_output_features_)
print(make_pipeline(StandardScaler(), LogisticRegression()).steps[0][0])
