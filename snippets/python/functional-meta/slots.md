---
lang: python
topic: functional-meta
tier: 3
tags: [slots, memory, attributes]
note: __slots__ removes __dict__, so typos raise AttributeError instead of creating a new field.
---
class WithDict:
    def __init__(self, x):
        self.x = x

class WithSlots:
    __slots__ = ("x", "y")

    def __init__(self, x, y=0):
        self.x, self.y = x, y

a, b = WithDict(1), WithSlots(1)
a.typo = 2
print(a.__dict__, hasattr(b, "__dict__"))
try:
    b.typo = 3
except AttributeError as e:
    print(type(e).__name__, WithSlots.__slots__)
