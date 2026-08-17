---
lang: python
topic: numerical
tier: 3
tags: [ode, implicit, newton]
note: The implicit step needs a solve at every stage, which buys unconditional stability.
---
import numpy as np

def backward_euler(f, dfdy, y0, t0, t1, h, tol=1e-12):
    ts, ys = [t0], [float(y0)]
    while ts[-1] < t1 - 1e-15:
        t, y = ts[-1] + h, ys[-1]
        guess = y
        for _ in range(50):
            g = guess - y - h * f(t, guess)
            dg = 1 - h * dfdy(t, guess)
            step = g / dg
            guess -= step
            if abs(step) < tol:
                break
        ys.append(guess)
        ts.append(t)
    return np.array(ts), np.array(ys)

ts, ys = backward_euler(lambda t, y: -50 * y, lambda t, y: -50.0, 1.0, 0, 1, 0.1)
print(ys[-1] < 1e-6, np.all(np.abs(ys) <= 1.0))
