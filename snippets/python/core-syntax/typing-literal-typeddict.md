---
lang: python
topic: core-syntax
tier: 3
tags: [typing, literal, typeddict]
note: TypedDict types the keys of a plain dict; Literal pins a value to a fixed set.
---
from typing import Literal, NotRequired, TypedDict

Mode = Literal["r", "w", "a"]

class Config(TypedDict):
    path: str
    mode: Mode
    buffer: NotRequired[int]

def describe(c: Config) -> str:
    return f"{c['path']}:{c['mode']}:{c.get('buffer', -1)}"

print(describe({"path": "a.txt", "mode": "w"}))
