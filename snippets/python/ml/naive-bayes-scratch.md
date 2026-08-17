---
lang: python
topic: ml
tier: 3
tags: [ml, naive-bayes, log-probability]
note: Sum log-probabilities instead of multiplying: with hundreds of features the product underflows.
---
import numpy as np

def fit(X, y):
    classes = np.unique(y)
    priors = np.array([(y == c).mean() for c in classes])
    means = np.array([X[y == c].mean(axis=0) for c in classes])
    varis = np.array([X[y == c].var(axis=0) + 1e-9 for c in classes])
    return classes, np.log(priors), means, varis

def predict(X, model):
    classes, log_prior, mu, var = model
    ll = -0.5 * (np.log(2 * np.pi * var) + (X[:, None, :] - mu) ** 2 / var).sum(axis=2)
    return classes[(ll + log_prior).argmax(axis=1)]

rng = np.random.default_rng(0)
X = np.vstack([rng.normal(-1, 1, (200, 4)), rng.normal(1, 1, (200, 4))])
y = np.r_[np.zeros(200, int), np.ones(200, int)]
print((predict(X, fit(X, y)) == y).mean() > 0.85)
