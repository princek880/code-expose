---
lang: python
topic: core-syntax
tier: 2
tags: [context-manager, with]
note: One with statement can hold several managers; they exit in reverse order.
---
from pathlib import Path

src, dst = Path("in.txt"), Path("out.txt")
with src.open() as fin, dst.open("w") as fout:
    for i, line in enumerate(fin, start=1):
        fout.write(f"{i:04d}: {line.rstrip()}\n")
