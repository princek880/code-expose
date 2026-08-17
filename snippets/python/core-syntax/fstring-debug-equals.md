---
lang: python
topic: core-syntax
tier: 2
tags: [fstring, debug]
note: The = suffix prints the expression source and its repr, which is why it beats print.
---
width, height = 3, 4
area = width * height
print(f"{width=} {height=} {area=}")
print(f"{width * height=}")
print(f"{area / width=:.3f}")
print(f"{[width, height]=}")
