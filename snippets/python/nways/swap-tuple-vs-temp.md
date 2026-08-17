---
lang: python
topic: nways
tier: 1
tags: [nways, swap, tuple-unpack]
note: Tuple-unpacking swap builds a temporary tuple under the hood; the manual version makes that step explicit.
---
a, b = 1, 2
a, b = b, a

x, y = 3, 4
temp = x
x = y
y = temp

p, q = 5, 6
p ^= q
q ^= p
p ^= q

print(a, b, x, y, p, q)
