---
lang: python
topic: dsa
tier: 2
tags: [prefix-sum, hashmap]
note: A prefix array of length n+1 removes every special case at index zero.
---
from itertools import accumulate

def build(xs):
    return [0] + list(accumulate(xs))

def range_sum(prefix, i, j):
    return prefix[j + 1] - prefix[i]

def count_subarrays_summing_to(xs, target):
    seen, running, total = {0: 1}, 0, 0
    for x in xs:
        running += x
        total += seen.get(running - target, 0)
        seen[running] = seen.get(running, 0) + 1
    return total

p = build([1, 2, 3, 4, 5])
print(range_sum(p, 1, 3), count_subarrays_summing_to([1, 1, 1], 2))
