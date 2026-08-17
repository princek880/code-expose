---
lang: python
topic: functional-meta
tier: 3
tags: [functional, currying, partial]
note: Currying turns one n-argument call into n one-argument calls; partial just pre-fills some of them.
---
from functools import partial, reduce

def curry3(fn):
    return lambda a: lambda b: lambda c: fn(a, b, c)

def volume(w, h, d):
    return w * h * d

curried = curry3(volume)
print(curried(2)(3)(4), volume(2, 3, 4))

base10 = partial(int, base=10)
base16 = partial(int, base=16)
print(base10("42"), base16("2a"), partial(reduce, lambda a, b: a * b)([1, 2, 3, 4]))
