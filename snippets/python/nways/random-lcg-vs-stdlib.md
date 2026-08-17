---
lang: python
topic: nways
tier: 3
tags: [nways, random, lcg]
note: A linear congruential generator is one multiply-add-mod; it is fast, deterministic, and not secure.
---
def lcg(seed, a=1103515245, c=12345, m=2 ** 31):
    state = seed
    while True:
        state = (a * state + c) % m
        yield state / m

import random

gen = lcg(42)
homemade = [next(gen) for _ in range(3)]
stdlib = random.Random(42).random()
print(all(0 <= x < 1 for x in homemade), round(stdlib, 4))
