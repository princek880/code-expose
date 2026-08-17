---
lang: python
topic: core-syntax
tier: 3
tags: [typing, typevar, callable]
note: A TypeVar ties input and output together, which a bare object annotation cannot.
---
from collections.abc import Callable, Iterable
from typing import TypeVar

T = TypeVar("T")
U = TypeVar("U")

def apply_all(fn: Callable[[T], U], xs: Iterable[T]) -> list[U]:
    return [fn(x) for x in xs]

def first_where(xs: Iterable[T], pred: Callable[[T], bool]) -> T | None:
    return next((x for x in xs if pred(x)), None)

print(apply_all(str, [1, 2]), first_where([1, 4, 9], lambda n: n > 3))
