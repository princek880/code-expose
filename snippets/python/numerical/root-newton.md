---
lang: python
topic: numerical
tier: 2
tags: [root-finding, newton]
note: Newton doubles the correct digits each step near a simple root, and diverges elsewhere.
---
def newton(f, df, x0, tol=1e-14, max_iter=100):
    x = x0
    for step in range(max_iter):
        fx = f(x)
        if abs(fx) < tol:
            return x, step
        dx = fx / df(x)
        x -= dx
        if abs(dx) < tol * max(1.0, abs(x)):
            return x, step
    return x, max_iter

root, steps = newton(lambda x: x ** 2 - 2, lambda x: 2 * x, 1.0)
print(f"{root:.15f}", steps, f"{root ** 2 - 2:.2e}")
