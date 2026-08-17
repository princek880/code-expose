---
lang: python
topic: numerical
tier: 3
tags: [probability, rejection-sampling, envelope]
note: Efficiency is the area ratio: a loose envelope wastes most of the proposals.
---
import math, random

def rejection(pdf, lo, hi, ceiling, rng, max_tries=10_000_000):
    for tries in range(1, max_tries):
        x = rng.uniform(lo, hi)
        if rng.uniform(0, ceiling) <= pdf(x):
            return x, tries
    raise RuntimeError("envelope too loose")

pdf = lambda x: math.sin(x) / 2.0
rng = random.Random(1)
samples = [rejection(pdf, 0, math.pi, 0.5, rng)[0] for _ in range(20000)]
mean = sum(samples) / len(samples)
print(round(mean, 3), round(math.pi / 2, 3))
