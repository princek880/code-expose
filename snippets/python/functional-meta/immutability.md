---
lang: python
topic: functional-meta
tier: 2
tags: [functional, immutability, frozen]
note: Immutable values are hashable and safe to share; every "change" returns a new object.
---
from dataclasses import dataclass, replace
from types import MappingProxyType

@dataclass(frozen=True)
class Config:
    host: str
    port: int
    flags: tuple[str, ...] = ()

base = Config("localhost", 80)
updated = replace(base, port=443, flags=base.flags + ("tls",))
print(base, updated, base is not updated)
view = MappingProxyType({"a": 1})
print(view["a"], hash(base) == hash(Config("localhost", 80)))
