---
lang: python
topic: numerical
tier: 3
tags: [statistics, mle, log-likelihood]
note: Maximise the log-likelihood, not the likelihood: sums do not underflow, products do.
---
import math

def poisson_log_lik(data, lam):
    if lam <= 0:
        return -math.inf
    return sum(x * math.log(lam) - lam - math.lgamma(x + 1) for x in data)

def mle_poisson(data, lo=1e-6, hi=100.0, iters=200):
    for _ in range(iters):
        m1, m2 = lo + (hi - lo) / 3, hi - (hi - lo) / 3
        if poisson_log_lik(data, m1) < poisson_log_lik(data, m2):
            lo = m1
        else:
            hi = m2
    return (lo + hi) / 2

data = [2, 3, 1, 4, 2, 0, 3, 2, 5, 2]
print(round(mle_poisson(data), 6), round(sum(data) / len(data), 6))
