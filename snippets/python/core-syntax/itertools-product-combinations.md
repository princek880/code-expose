---
lang: python
topic: core-syntax
tier: 2
tags: [itertools, product, combinations]
note: product with repeat replaces nested loops of the same iterable.
---
from itertools import product, combinations, permutations, combinations_with_replacement

print(list(product("ab", [1, 2])))
print(list(product("01", repeat=3))[:3])
print(list(combinations("abcd", 2)))
print(list(permutations("abc", 2))[:3])
print(list(combinations_with_replacement("ab", 2)))
