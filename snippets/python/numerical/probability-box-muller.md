---
lang: python
topic: numerical
tier: 3
tags: [probability, box-muller, gaussian]
note: One pair of uniforms yields two independent standard normals, via radius and angle.
---
import math, random

def box_muller(rng):
    u1 = 1.0 - rng.random()
    u2 = rng.random()
    r = math.sqrt(-2.0 * math.log(u1))
    theta = 2.0 * math.pi * u2
    return r * math.cos(theta), r * math.sin(theta)

rng = random.Random(0)
xs = []
for _ in range(20000):
    a, b = box_muller(rng)
    xs.extend((a, b))
mean = sum(xs) / len(xs)
var = sum((x - mean) ** 2 for x in xs) / (len(xs) - 1)
print(round(mean, 3), round(var, 3))
