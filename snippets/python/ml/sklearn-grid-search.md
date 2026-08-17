---
lang: python
topic: ml
tier: 3
tags: [sklearn, grid-search, cross-validation]
note: Prefix the grid keys with the step name so the search can reach nested estimator parameters.
---
import numpy as np
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

pipe = Pipeline([("scale", StandardScaler()), ("model", Ridge())])
grid = {"model__alpha": [0.01, 0.1, 1.0, 10.0, 100.0]}

rng = np.random.default_rng(0)
X = rng.normal(size=(120, 5))
y = X @ np.arange(5) + rng.normal(0, 1.0, 120)

search = GridSearchCV(pipe, grid, cv=4, scoring="neg_mean_squared_error")
search.fit(X, y)
print(search.best_params_, round(-search.best_score_, 3))
print(cross_val_score(pipe, X, y, cv=4, scoring="r2").round(3))
