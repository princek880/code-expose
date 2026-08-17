---
lang: python
topic: core-syntax
tier: 3
tags: [functools, dispatch]
note: singledispatch picks the implementation from the first argument's runtime type.
---
from functools import singledispatch

@singledispatch
def size(obj):
    raise TypeError(f"no rule for {type(obj).__name__}")

@size.register
def _(obj: str) -> int:
    return len(obj)

@size.register(list)
@size.register(tuple)
def _(obj) -> int:
    return sum(size(x) for x in obj)

@size.register
def _(obj: int) -> int:
    return obj

print(size("abc"), size([1, "xy", (3,)]))
