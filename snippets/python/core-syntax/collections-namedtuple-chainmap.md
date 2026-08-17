---
lang: python
topic: core-syntax
tier: 2
tags: [collections, namedtuple, chainmap]
note: ChainMap searches its maps left to right and writes only to the first.
---
from collections import namedtuple, ChainMap

Row = namedtuple("Row", "name qty price", defaults=(0, 0.0))
r = Row("bolt", 12, 0.25)
print(r.name, r._replace(qty=20), r._asdict()["price"], *Row("nut"))

defaults = {"debug": False, "level": 1}
env = {"level": 3}
cfg = ChainMap({}, env, defaults)
cfg["debug"] = True
print(cfg["level"], cfg["debug"], len(cfg.maps))
