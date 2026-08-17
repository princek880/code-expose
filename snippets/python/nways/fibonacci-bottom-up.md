---
lang: python
topic: nways
tier: 1
tags: [nways, fibonacci, iterative]
note: Two rolling variables replace the whole call stack, and the memory drops from O(n) to O(1).
---
def fib_iter(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fib_iter(n) for n in range(10)])
