---
lang: python
topic: ml
tier: 2
tags: [sklearn, metrics, confusion-matrix]
note: Accuracy is meaningless under imbalance; read precision, recall and the matrix instead.
---
import numpy as np
from sklearn.metrics import (accuracy_score, precision_recall_fscore_support,
                             confusion_matrix, roc_auc_score, classification_report)

rng = np.random.default_rng(0)
y_true = (rng.random(400) < 0.1).astype(int)
scores = np.clip(y_true * 0.6 + rng.random(400) * 0.5, 0, 1)
y_pred = (scores > 0.5).astype(int)

print(round(accuracy_score(y_true, y_pred), 3), round(roc_auc_score(y_true, scores), 3))
p, r, f1, _ = precision_recall_fscore_support(y_true, y_pred, average="binary", zero_division=0)
print(round(p, 3), round(r, 3), round(f1, 3))
print(confusion_matrix(y_true, y_pred).ravel())
