---
lang: python
topic: nways
tier: 2
tags: [nways, random, numpy, generator]
note: np.random.default_rng is the modern PCG64-based API; the legacy np.random.* calls share hidden global state.
---
import numpy as np
import random

legacy_module_state = random.random()
rng = np.random.default_rng(seed=0)
independent = rng.random(3)
rng2 = np.random.default_rng(seed=0)
print(0 <= legacy_module_state < 1, independent.shape, np.array_equal(independent, rng2.random(3)))
