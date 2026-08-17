---
lang: python
topic: numerical
tier: 4
tags: [statistics, kalman, state-estimation]
note: Predict inflates the covariance, update shrinks it. The gain decides how much you trust the sensor.
---
import numpy as np

def kalman(zs, A, H, Q, R, x0, P0):
    x, P = np.array(x0, dtype=float), np.array(P0, dtype=float)
    out = []
    for z in zs:
        x = A @ x
        P = A @ P @ A.T + Q
        K = P @ H.T @ np.linalg.inv(H @ P @ H.T + R)
        x = x + K @ (np.atleast_1d(z) - H @ x)
        P = P - K @ H @ P
        out.append(x.copy())
    return np.array(out)

rng = np.random.default_rng(0)
truth = np.cumsum(np.ones(50) * 0.5)
zs = truth + rng.normal(0, 1.0, 50)
A = np.array([[1.0, 1.0], [0.0, 1.0]])
H = np.array([[1.0, 0.0]])
est = kalman(zs, A, H, np.eye(2) * 1e-4, np.array([[1.0]]), [0.0, 0.5], np.eye(2))
print(np.abs(est[-10:, 0] - truth[-10:]).mean() < np.abs(zs[-10:] - truth[-10:]).mean())
