---
lang: python
topic: numerical
tier: 3
tags: [ode, runge-kutta, rk4]
note: Four evaluations per step with the 1-2-2-1 weighting gives fourth-order accuracy.
---
import numpy as np

def rk4(f, y0, t0, t1, h):
    t, y = t0, np.array(y0, dtype=float)
    out = [(t, y.copy())]
    while t < t1 - 1e-15:
        k1 = f(t, y)
        k2 = f(t + h / 2, y + h / 2 * k1)
        k3 = f(t + h / 2, y + h / 2 * k2)
        k4 = f(t + h, y + h * k3)
        y = y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4)
        t += h
        out.append((t, y.copy()))
    return out

harmonic = lambda t, y: np.array([y[1], -y[0]])
path = rk4(harmonic, [1.0, 0.0], 0, 2 * np.pi, 0.01)
print(path[-1][1].round(8), np.cos(2 * np.pi).round(8))
