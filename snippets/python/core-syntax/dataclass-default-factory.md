---
lang: python
topic: core-syntax
tier: 2
tags: [dataclass, field]
note: Mutable defaults need default_factory; a bare [] is a hard error at class creation.
---
from dataclasses import dataclass, field

@dataclass
class Job:
    name: str
    args: list[str] = field(default_factory=list)
    env: dict[str, str] = field(default_factory=dict)
    retries: int = 3
    _token: str = field(default="", repr=False, compare=False)

a, b = Job("build"), Job("build")
a.args.append("-j8")
print(a, b.args, a == b)
