---
lang: python
topic: core-syntax
tier: 2
tags: [builtins, sorted, key]
note: Negate a numeric field to sort it descending while the rest stays ascending.
---
rows = [("bolt", 3, 0.25), ("nut", 3, 0.10), ("cam", 1, 5.00)]
print(sorted(rows, key=lambda r: (-r[1], r[0])))
print(sorted(rows, key=lambda r: r[2], reverse=True)[0])
print(max(rows, key=lambda r: r[1] * r[2]))
print(min(rows, key=lambda r: len(r[0])))
print(sorted("Hello World".split(), key=str.lower))
