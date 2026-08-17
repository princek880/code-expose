---
lang: python
topic: numerical
tier: 4
tags: [probability, alias-method, sampling]
note: Setup is O(n) and every draw after that is O(1): one uniform and one comparison.
---
import random

def build_alias(weights):
    n = len(weights)
    total = sum(weights)
    scaled = [w * n / total for w in weights]
    prob, alias = [0.0] * n, [0] * n
    small = [i for i, p in enumerate(scaled) if p < 1]
    large = [i for i, p in enumerate(scaled) if p >= 1]
    while small and large:
        s, l = small.pop(), large.pop()
        prob[s], alias[s] = scaled[s], l
        scaled[l] -= 1 - scaled[s]
        (small if scaled[l] < 1 else large).append(l)
    for i in small + large:
        prob[i] = 1.0
    return prob, alias

def draw(prob, alias, rng):
    i = rng.randrange(len(prob))
    return i if rng.random() < prob[i] else alias[i]

prob, alias = build_alias([1, 1, 8])
rng = random.Random(0)
counts = [0] * 3
for _ in range(40000):
    counts[draw(prob, alias, rng)] += 1
print([round(c / 40000, 2) for c in counts])
