---
lang: python
topic: nways
tier: 2
tags: [nways, file-io, chunks, streaming]
note: Reading fixed-size chunks bounds memory use regardless of file size; read() with no argument does not.
---
from pathlib import Path

p = Path("nways_demo4.txt")
p.write_text("x" * 10_000)

total = 0
with p.open() as f:
    while chunk := f.read(1024):
        total += len(chunk)

print(total)
p.unlink()
