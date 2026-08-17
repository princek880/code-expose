---
lang: python
topic: core-syntax
tier: 3
tags: [dataclass, post-init]
note: InitVar fields reach __post_init__ but are never stored on the instance.
---
from dataclasses import dataclass, field, InitVar

@dataclass
class Box:
    width: float
    height: float
    scale: InitVar[float] = 1.0
    area: float = field(init=False)

    def __post_init__(self, scale):
        self.width *= scale
        self.height *= scale
        self.area = self.width * self.height

print(Box(2, 3), Box(2, 3, scale=2).area)
