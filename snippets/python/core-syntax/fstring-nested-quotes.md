---
lang: python
topic: core-syntax
tier: 3
tags: [fstring, quoting]
note: Before 3.12 the inner quotes had to differ from the outer ones; nesting braces never did.
---
d = {"key": "value", "n": 7}
items = ["a", "b"]
print(f"{d['key']}-{d['n']:03d}")
print(f"{', '.join(items)}")
print(f"{ {k: v for k, v in d.items() if k != 'n'} }")
print(f"{'yes' if d['n'] > 5 else 'no'}")
