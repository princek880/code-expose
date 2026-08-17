---
lang: python
topic: core-syntax
tier: 2
tags: [generator, lazy]
note: A bare generator expression needs no brackets when it is the only argument.
---
lines = ["12", "x", "30", "", "7"]
total = sum(int(s) for s in lines if s.isdigit())
first_big = next((int(s) for s in lines if s.isdigit() and int(s) > 20), None)
any_blank = any(not s.strip() for s in lines)
all_short = all(len(s) <= 2 for s in lines)
print(total, first_big, any_blank, all_short)
