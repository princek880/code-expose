---
lang: python
topic: numerical
tier: 3
tags: [statistics, permutation-test, exact]
note: Shuffle the group labels, not the values; the null says the labels carry no information.
---
import numpy as np

def permutation_test(a, b, reps=20000, seed=0):
    rng = np.random.default_rng(seed)
    pooled = np.concatenate([a, b])
    observed = a.mean() - b.mean()
    n = len(a)
    count = 0
    for _ in range(reps):
        rng.shuffle(pooled)
        if abs(pooled[:n].mean() - pooled[n:].mean()) >= abs(observed):
            count += 1
    return observed, (count + 1) / (reps + 1)

rng = np.random.default_rng(2)
a = rng.normal(0.6, 1.0, 40)
b = rng.normal(0.0, 1.0, 45)
diff, p = permutation_test(a, b)
print(round(diff, 4), round(p, 4), p < 0.05)
