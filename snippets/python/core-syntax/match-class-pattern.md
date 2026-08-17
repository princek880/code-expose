---
lang: python
topic: core-syntax
tier: 3
tags: [match, class]
note: Positional class patterns need __match_args__, which dataclasses supply for free.
---
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

def where(p):
    match p:
        case Point(0, 0):
            return "origin"
        case Point(x=0, y=y):
            return f"y-axis@{y}"
        case Point(x, y) if x == y:
            return "diagonal"
        case Point():
            return "plane"

print(where(Point(0, 0)), where(Point(0, 5)), where(Point(2, 2)))
