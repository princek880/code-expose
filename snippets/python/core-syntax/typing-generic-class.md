---
lang: python
topic: core-syntax
tier: 3
tags: [typing, generic]
note: Generic[T] parameterises the class so the element type survives into the methods.
---
from typing import Generic, TypeVar

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def peek(self) -> T | None:
        return self._items[-1] if self._items else None

s: Stack[int] = Stack()
s.push(1); s.push(2)
print(s.pop(), s.peek())
