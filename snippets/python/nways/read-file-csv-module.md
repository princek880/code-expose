---
lang: python
topic: nways
tier: 2
tags: [nways, file-io, csv]
note: The csv module handles quoting and embedded commas that a naive line.split(",") silently gets wrong.
---
import csv
from pathlib import Path

p = Path("nways_demo5.csv")
p.write_text('name,age\n"Doe, Jane",30\nBob,25\n')

with p.open(newline="") as f:
    rows = list(csv.DictReader(f))

naive = [line.split(",") for line in p.read_text().splitlines()[1:]]
print(rows, len(naive[0]) != 2)
p.unlink()
