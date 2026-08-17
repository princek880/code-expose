---
lang: python
topic: core-syntax
tier: 3
tags: [walrus, comprehension]
note: Inside a comprehension the walrus lets the filter and the value share one computation.
---
words = ["alpha", "be", "gamma", "hi", "delta"]
lens = [n for w in words if (n := len(w)) > 2]
scaled = {w: sq for w in words if (sq := len(w) ** 2) > 9}
first = next((m for w in words if (m := w.upper()).startswith("G")), None)
print(lens, scaled, first)
