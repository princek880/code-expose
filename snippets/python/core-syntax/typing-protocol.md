---
lang: python
topic: core-syntax
tier: 3
tags: [typing, protocol, structural]
note: A Protocol is structural: anything with the right methods matches, no inheritance.
---
from typing import Protocol, runtime_checkable

@runtime_checkable
class Sized(Protocol):
    def __len__(self) -> int: ...

class Closeable(Protocol):
    def close(self) -> None: ...

def total_size(items: list[Sized]) -> int:
    return sum(len(i) for i in items)

print(total_size(["ab", [1, 2, 3], {}]), isinstance("x", Sized))
