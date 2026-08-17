---
lang: python
topic: ml
tier: 3
tags: [sklearn, transformer, api]
note: Implement fit and transform and inherit the two mixins; that is the entire estimator contract.
---
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression

class ClipOutliers(BaseEstimator, TransformerMixin):
    def __init__(self, quantile=0.99):
        self.quantile = quantile

    def fit(self, X, y=None):
        self.lo_ = np.quantile(X, 1 - self.quantile, axis=0)
        self.hi_ = np.quantile(X, self.quantile, axis=0)
        return self

    def transform(self, X):
        return np.clip(X, self.lo_, self.hi_)

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 3))
X[0] = 50.0
model = make_pipeline(ClipOutliers(0.95), LinearRegression())
model.fit(X, X.sum(axis=1))
print(model.named_steps["clipoutliers"].hi_.round(2), round(model.score(X, X.sum(axis=1)), 3))
