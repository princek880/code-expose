---
lang: python
topic: core-syntax
tier: 1
tags: [slice, step]
note: A slice never raises for out-of-range bounds; it clamps.
---
xs = list(range(10))
print(xs[2:7], xs[:3], xs[7:])
print(xs[::2], xs[1::3], xs[::-2])
print(xs[-3:], xs[:-3], xs[-7:-2])
print(xs[100:], xs[3:3], xs[5:2])
