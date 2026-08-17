---
lang: python
topic: core-syntax
tier: 1
tags: [comprehension, dict, set]
note: Same brackets as a dict or set literal, so the type is decided by the punctuation.
---
words = ["alpha", "beta", "gamma", "beta"]
lengths = {w: len(w) for w in words}
initials = {w[0] for w in words}
inverted = {v: k for k, v in lengths.items()}
by_len = {n: [w for w in words if len(w) == n] for n in set(lengths.values())}
