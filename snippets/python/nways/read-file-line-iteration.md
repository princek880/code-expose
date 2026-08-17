---
lang: python
topic: nways
tier: 1
tags: [nways, file-io, iteration, lazy]
note: Iterating the file object streams one line at a time; readlines() would load the whole file into a list first.
---
from pathlib import Path

p = Path("nways_demo2.txt")
p.write_text("a\nb\nc\n")

total_chars = 0
with p.open() as f:
    for line in f:
        total_chars += len(line.rstrip("\n"))

print(total_chars)
p.unlink()
