---
lang: python
topic: dsa
tier: 3
tags: [ternary-search, unimodal]
note: Ternary search needs a strictly unimodal function; binary search needs a monotone one.
---
def ternary_max(f, lo, hi, iters=200):
    for _ in range(iters):
        m1 = lo + (hi - lo) / 3
        m2 = hi - (hi - lo) / 3
        if f(m1) < f(m2):
            lo = m1
        else:
            hi = m2
    return (lo + hi) / 2

peak = ternary_max(lambda x: -(x - 2.5) ** 2 + 7, -10.0, 10.0)
print(f"{peak:.6f}")
