---
lang: python
topic: nways
tier: 1
tags: [nways, file-io, pathlib]
note: read_text and read_bytes open, read and close in one call, with no explicit context manager needed.
---
from pathlib import Path

p = Path("nways_demo3.txt")
p.write_text("hello\nworld\n", encoding="utf-8")

text = p.read_text(encoding="utf-8")
lines = p.read_text().splitlines()
raw = p.read_bytes()
print(text.count("\n"), lines, len(raw))
p.unlink()
