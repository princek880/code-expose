---
lang: python
topic: numerical
tier: 4
tags: [ode, adaptive, error-control]
note: Compare one big step against two half steps; the difference estimates the local error.
---
import numpy as np

def step_rk4(f, t, y, h):
    k1 = f(t, y)
    k2 = f(t + h / 2, y + h / 2 * k1)
    k3 = f(t + h / 2, y + h / 2 * k2)
    k4 = f(t + h, y + h * k3)
    return y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)

def adaptive(f, y0, t0, t1, h=0.1, tol=1e-8):
    t, y, steps = t0, float(y0), 0
    while t < t1 - 1e-15:
        h = min(h, t1 - t)
        big = step_rk4(f, t, y, h)
        half = step_rk4(f, t + h / 2, step_rk4(f, t, y, h / 2), h / 2)
        err = abs(half - big) / 15
        if err < tol or h < 1e-12:
            t, y = t + h, half
            steps += 1
        h *= min(2.0, max(0.2, 0.9 * (tol / (err + 1e-300)) ** 0.2))
    return y, steps

y, steps = adaptive(lambda t, v: -2 * v, 1.0, 0, 1)
print(round(y, 9), round(float(np.exp(-2)), 9), steps < 100)
