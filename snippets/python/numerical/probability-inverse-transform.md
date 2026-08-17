---
lang: python
topic: numerical
tier: 3
tags: [probability, sampling, inverse-cdf]
note: If U is uniform then F-inverse(U) has distribution F. That is the whole method.
---
import math, random

def exponential(rate, rng):
    return -math.log(1.0 - rng.random()) / rate

def discrete(weights, rng):
    total = sum(weights)
    u = rng.random() * total
    running = 0.0
    for i, w in enumerate(weights):
        running += w
        if u < running:
            return i
    return len(weights) - 1

rng = random.Random(0)
xs = [exponential(2.0, rng) for _ in range(20000)]
print(round(sum(xs) / len(xs), 3), round(1 / 2.0, 3))
counts = [0] * 3
for _ in range(30000):
    counts[discrete([1, 2, 7], rng)] += 1
print([round(c / 30000, 2) for c in counts])
