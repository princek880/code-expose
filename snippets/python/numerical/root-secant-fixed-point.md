---
lang: python
topic: numerical
tier: 3
tags: [root-finding, secant, fixed-point]
note: Secant replaces the derivative with a finite difference; fixed-point needs |g'| < 1 to converge.
---
def secant(f, x0, x1, tol=1e-13, max_iter=100):
    f0, f1 = f(x0), f(x1)
    for _ in range(max_iter):
        if abs(f1 - f0) < 1e-300:
            break
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        x0, x1, f0, f1 = x1, x2, f1, f(x2)
        if abs(f1) < tol:
            break
    return x1

def fixed_point(g, x0, tol=1e-13, max_iter=1000):
    x = x0
    for _ in range(max_iter):
        nxt = g(x)
        if abs(nxt - x) < tol:
            return nxt
        x = nxt
    return x

print(f"{secant(lambda x: x ** 3 - x - 2, 1.0, 2.0):.10f}")
print(f"{fixed_point(lambda x: (x + 2) ** (1 / 3), 1.0):.10f}")
