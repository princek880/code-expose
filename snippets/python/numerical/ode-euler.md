---
lang: python
topic: numerical
tier: 2
tags: [ode, euler, stability]
note: Forward Euler is explicit and cheap; its error is O(h) and it goes unstable for stiff systems.
---
import numpy as np

def forward_euler(f, y0, t0, t1, h):
    ts, ys = [t0], [np.array(y0, dtype=float)]
    while ts[-1] < t1 - 1e-15:
        y, t = ys[-1], ts[-1]
        ys.append(y + h * f(t, y))
        ts.append(t + h)
    return np.array(ts), np.array(ys)

ts, ys = forward_euler(lambda t, y: -2 * y, [1.0], 0, 1, 0.05)
print(ts[-1], ys[-1].round(6), round(float(np.exp(-2)), 6))
