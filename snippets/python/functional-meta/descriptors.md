---
lang: python
topic: functional-meta
tier: 4
tags: [descriptor, get, set]
note: __set_name__ tells the descriptor which attribute it was assigned to, so no name duplication.
---
class Typed:
    def __init__(self, expected):
        self.expected = expected

    def __set_name__(self, owner, name):
        self.private = "_" + name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private)

    def __set__(self, obj, value):
        if not isinstance(value, self.expected):
            raise TypeError(f"expected {self.expected.__name__}")
        setattr(obj, self.private, value)

class Point:
    x = Typed(int)
    y = Typed(int)

    def __init__(self, x, y):
        self.x, self.y = x, y

p = Point(1, 2)
print(p.x, p.y, isinstance(Point.x, Typed))
