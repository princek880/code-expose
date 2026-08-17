---
lang: python
topic: numerical
tier: 4
tags: [statistics, em, gmm]
note: E-step computes soft memberships, M-step re-fits the parameters to those weights. Repeat.
---
import numpy as np

def em_gmm(x, k=2, iters=200, seed=0):
    rng = np.random.default_rng(seed)
    mu = rng.choice(x, k, replace=False).astype(float)
    var = np.full(k, x.var())
    pi = np.full(k, 1.0 / k)
    for _ in range(iters):
        dens = pi * np.exp(-0.5 * (x[:, None] - mu) ** 2 / var) / np.sqrt(2 * np.pi * var)
        resp = dens / dens.sum(axis=1, keepdims=True)
        nk = resp.sum(axis=0)
        mu = (resp * x[:, None]).sum(axis=0) / nk
        var = (resp * (x[:, None] - mu) ** 2).sum(axis=0) / nk + 1e-9
        pi = nk / len(x)
    return np.sort(mu), var[np.argsort(mu)], pi[np.argsort(mu)]

rng = np.random.default_rng(3)
x = np.concatenate([rng.normal(-3, 0.7, 400), rng.normal(4, 1.2, 600)])
mu, var, pi = em_gmm(x)
print(mu.round(2), pi.round(2))
