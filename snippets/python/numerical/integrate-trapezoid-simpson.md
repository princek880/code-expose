---
lang: python
topic: numerical
tier: 2
tags: [integration, trapezoid, simpson]
note: Simpson needs an even number of intervals, and it is exact for cubics.
---
def trapezoid(f, a, b, n=1000):
    h = (b - a) / n
    total = (f(a) + f(b)) / 2
    for i in range(1, n):
        total += f(a + i * h)
    return total * h

def simpson(f, a, b, n=1000):
    if n % 2:
        n += 1
    h = (b - a) / n
    total = f(a) + f(b)
    for i in range(1, n):
        total += f(a + i * h) * (4 if i % 2 else 2)
    return total * h / 3

import math
print(f"{trapezoid(math.sin, 0, math.pi):.10f}")
print(f"{simpson(math.sin, 0, math.pi):.10f}")
