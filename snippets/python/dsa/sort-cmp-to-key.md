---
lang: python
topic: dsa
tier: 3
tags: [sorting, cmp-to-key]
note: Use cmp_to_key only when the order is not expressible as a key, like this concatenation test.
---
from functools import cmp_to_key

def largest_number(nums):
    def cmp(a, b):
        if a + b > b + a:
            return -1
        return 1 if a + b < b + a else 0
    return "".join(sorted(map(str, nums), key=cmp_to_key(cmp)))

print(largest_number([3, 30, 34, 5, 9]))
print(sorted([(1, "b"), (1, "a"), (0, "c")], key=cmp_to_key(lambda x, y: (x > y) - (x < y))))
