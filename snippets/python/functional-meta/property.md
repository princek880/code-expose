---
lang: python
topic: functional-meta
tier: 2
tags: [property, encapsulation, cached-property]
note: cached_property stores the result in the instance dict, so it needs no __slots__ conflict.
---
from functools import cached_property

class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("negative radius")
        self._radius = value
        self.__dict__.pop("area", None)

    @cached_property
    def area(self):
        return 3.141592653589793 * self._radius ** 2

c = Circle(2)
print(round(c.area, 4), "area" in c.__dict__)
c.radius = 3
print(round(c.area, 4))
