---
lang: python
topic: core-syntax
tier: 2
tags: [comprehension, ternary]
note: A ternary sits in the value slot; a filter sits after the for. They are different tools.
---
scores = {"a": 91, "b": 47, "c": 78, "d": 12}
graded = {k: ("pass" if v >= 60 else "fail") for k, v in scores.items()}
clamped = [min(max(v, 20), 90) for v in scores.values()]
sparse = {k: v for k, v in scores.items() if v >= 60}
buckets = [[k for k, v in scores.items() if v // 25 == b] for b in range(4)]
