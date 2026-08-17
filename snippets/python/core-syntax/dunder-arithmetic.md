---
lang: python
topic: core-syntax
tier: 3
tags: [dunder, operator]
note: Return NotImplemented for unknown operands so Python can try the reflected method.
---
class Vec:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, o):
        if not isinstance(o, Vec):
            return NotImplemented
        return Vec(self.x + o.x, self.y + o.y)

    def __mul__(self, k):
        return Vec(self.x * k, self.y * k)

    __rmul__ = __mul__

    def __neg__(self):
        return self * -1

    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

v = 3 * Vec(1, 2) + -Vec(0, 1)
print(v.x, v.y, abs(Vec(3, 4)))
