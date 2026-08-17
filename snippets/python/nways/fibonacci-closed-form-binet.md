---
lang: python
topic: nways
tier: 3
tags: [nways, fibonacci, binet, closed-form]
note: Binet's formula is O(1) per call but loses exact integer precision once phi^n overflows a float's mantissa.
---
import math

PHI = (1 + math.sqrt(5)) / 2
PSI = (1 - math.sqrt(5)) / 2

def fib_binet(n):
    return round((PHI ** n - PSI ** n) / math.sqrt(5))

print([fib_binet(n) for n in range(10)])
print(fib_binet(70), fib_binet(71))
