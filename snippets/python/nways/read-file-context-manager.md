---
lang: python
topic: nways
tier: 1
tags: [nways, file-io, context-manager]
note: The with block closes the file even if an exception fires partway through reading it.
---
from pathlib import Path

p = Path("nways_demo.txt")
p.write_text("line one\nline two\nline three\n")

with p.open() as f:
    whole = f.read()

print(len(whole), whole.count("\n"))
p.unlink()
