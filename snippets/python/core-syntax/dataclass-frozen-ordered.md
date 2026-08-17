---
lang: python
topic: core-syntax
tier: 2
tags: [dataclass, frozen]
note: frozen=True gives you __hash__ and makes the instance usable as a dict key.
---
from dataclasses import dataclass, replace

@dataclass(frozen=True, order=True, slots=True)
class Point:
    x: int
    y: int

p = Point(1, 2)
q = replace(p, y=9)
print(sorted([q, p]), {p: "origin-ish"}[Point(1, 2)])
