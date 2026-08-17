---
lang: python
topic: ml
tier: 2
tags: [sklearn, split, stratify]
note: Stratify on the label whenever the classes are imbalanced, or a fold can miss a class entirely.
---
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold

rng = np.random.default_rng(0)
X = rng.normal(size=(200, 4))
y = (rng.random(200) < 0.15).astype(int)

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)
print(X_tr.shape, X_te.shape, round(y_tr.mean(), 3), round(y_te.mean(), 3))

skf = StratifiedKFold(n_splits=4, shuffle=True, random_state=0)
print([round(y[te].mean(), 2) for _, te in skf.split(X, y)])
