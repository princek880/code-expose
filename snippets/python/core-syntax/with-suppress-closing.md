---
lang: python
topic: core-syntax
tier: 2
tags: [contextlib, suppress]
note: suppress swallows only the listed exceptions and only for the rest of the block.
---
from contextlib import suppress, closing, ExitStack

with suppress(FileNotFoundError, PermissionError):
    open("/nope/missing.txt").read()

with ExitStack() as stack:
    files = [stack.enter_context(open(p)) for p in ("a.txt", "b.txt")]
    sizes = [len(f.read()) for f in files]
