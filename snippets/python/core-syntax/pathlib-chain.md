---
lang: python
topic: core-syntax
tier: 2
tags: [pathlib, filesystem]
note: The / operator builds paths; with_suffix and stem avoid all string surgery.
---
from pathlib import Path

root = Path("data") / "raw"
target = (root / "sample.tar.gz").with_suffix("").with_suffix(".csv")
print(target, target.stem, target.suffix, target.parent.name)
print(Path("/a/b/c.txt").parts, Path("a/b").joinpath("c", "d"))
sizes = {p.name: p.stat().st_size for p in Path(".").glob("*.md") if p.is_file()}
