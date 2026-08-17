---
lang: python
topic: nways
tier: 4
tags: [nways, fibonacci, fast-doubling]
note: F(2k) and F(2k+1) both come from F(k) and F(k+1), which halves the problem every step without a matrix.
---
def fib_fast_doubling(n):
    def go(k):
        if k == 0:
            return (0, 1)
        a, b = go(k >> 1)
        c = a * (2 * b - a)
        d = a * a + b * b
        return (d, c + d) if k & 1 else (c, d)
    return go(n)[0]

print([fib_fast_doubling(n) for n in range(10)], fib_fast_doubling(100))
