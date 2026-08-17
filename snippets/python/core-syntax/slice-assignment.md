---
lang: python
topic: core-syntax
tier: 2
tags: [slice, mutation]
note: Slice assignment can change the list length; extended-step assignment cannot.
---
xs = list(range(8))
xs[2:4] = [20, 30, 40]
xs[::2] = [0] * len(xs[::2])
xs[-2:] = []
del xs[1:3]
print(xs, len(xs))
