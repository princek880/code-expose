---
lang: python
topic: numerical
tier: 3
tags: [optimization, annealing, metropolis]
note: Accepting uphill moves with probability exp(-delta/T) is what escapes local minima early on.
---
import math, random

def anneal(cost, neighbour, state, t0=1.0, cooling=0.999, iters=20000, seed=0):
    rng = random.Random(seed)
    best = state
    best_cost = cur_cost = cost(state)
    temp = t0
    for _ in range(iters):
        cand = neighbour(state, rng)
        cand_cost = cost(cand)
        delta = cand_cost - cur_cost
        if delta < 0 or rng.random() < math.exp(-delta / temp):
            state, cur_cost = cand, cand_cost
            if cur_cost < best_cost:
                best, best_cost = state, cur_cost
        temp *= cooling
    return best, best_cost

cost = lambda x: (x - 2.5) ** 2 + 3 * math.sin(5 * x)
best, c = anneal(cost, lambda x, r: x + r.gauss(0, 0.4), 0.0)
print(round(best, 3), round(c, 5))
