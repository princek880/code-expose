---
lang: python
topic: core-syntax
tier: 2
tags: [walrus, loop]
note: The walrus assigns and yields in one expression, which collapses the read-then-test loop.
---
import sys

buf = []
while (line := sys.stdin.readline()) and (n := len(line.strip())):
    buf.append((n, line.strip()))
    if n > 80:
        break
print(len(buf))
