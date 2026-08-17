---
lang: python
topic: functional-meta
tier: 3
tags: [functional, composition, pipeline]
note: compose applies right to left; pipe applies left to right. Pick one and never mix them.
---
from functools import reduce

def compose(*fns):
    return reduce(lambda f, g: lambda x: f(g(x)), fns)

def pipe(*fns):
    return reduce(lambda f, g: lambda x: g(f(x)), fns)

inc = lambda n: n + 1
double = lambda n: n * 2
show = lambda n: f"<{n}>"

print(compose(show, double, inc)(3))
print(pipe(inc, double, show)(3))
print(compose(*[inc] * 5)(0), pipe(str, len)(12345))
