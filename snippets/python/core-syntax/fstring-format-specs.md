---
lang: python
topic: core-syntax
tier: 1
tags: [fstring, format]
note: The spec after the colon is the same mini-language str.format has always used.
---
n, pi, big = 42, 3.14159, 1234567
print(f"{n:5d}|{n:<5d}|{n:^5d}|{n:05d}")
print(f"{pi:.2f} {pi:8.3f} {pi:+.1f} {pi:e}")
print(f"{big:,} {big:_} {n:#x} {n:#o} {n:#b}")
print(f"{0.8734:.1%} {n:>{n // 7}d}")
