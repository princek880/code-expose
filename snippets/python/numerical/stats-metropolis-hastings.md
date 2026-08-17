---
lang: python
topic: numerical
tier: 4
tags: [statistics, mcmc, metropolis]
note: For a symmetric proposal the acceptance ratio is just the target density ratio.
---
import math, random

def metropolis(log_target, x0, step=1.0, draws=50000, seed=0):
    rng = random.Random(seed)
    x, lp = x0, log_target(x0)
    chain, accepted = [], 0
    for _ in range(draws):
        cand = x + rng.gauss(0, step)
        lc = log_target(cand)
        if lc - lp > math.log(rng.random() or 1e-300):
            x, lp = cand, lc
            accepted += 1
        chain.append(x)
    return chain, accepted / draws

log_target = lambda x: -0.5 * ((x - 2.0) / 1.5) ** 2
chain, rate = metropolis(log_target, 0.0, step=2.0)
burned = chain[5000:]
mean = sum(burned) / len(burned)
print(round(mean, 2), round(rate, 2))
