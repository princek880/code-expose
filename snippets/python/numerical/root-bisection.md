---
lang: python
topic: numerical
tier: 2
tags: [root-finding, bisection]
note: Bisection needs a sign change and always converges, halving the bracket every step.
---
def bisect(f, lo, hi, tol=1e-12, max_iter=200):
    flo = f(lo)
    if flo * f(hi) > 0:
        raise ValueError("no sign change in bracket")
    for _ in range(max_iter):
        mid = (lo + hi) / 2
        fm = f(mid)
        if abs(fm) < tol or hi - lo < tol:
            return mid
        if flo * fm < 0:
            hi = mid
        else:
            lo, flo = mid, fm
    return (lo + hi) / 2

root = bisect(lambda x: x ** 3 - x - 2, 1.0, 2.0)
print(f"{root:.10f}", f"{root ** 3 - root - 2:.2e}")
