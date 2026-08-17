---
lang: python
topic: core-syntax
tier: 2
tags: [fstring, align]
note: Fill character comes before the alignment flag, so ">" and "0>" differ.
---
rows = [("alpha", 1.5), ("beta", 22.125), ("gamma", 333.0)]
for name, val in rows:
    print(f"{name:.<10}{val:>9.3f}")
for name, val in rows:
    print(f"|{name:^12}|{val:0>10.2f}|")
