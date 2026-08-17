---
lang: python
topic: dsa
tier: 3
tags: [dp, partition, bitset]
note: A Python int is an arbitrary-width bitset, so the whole subset-sum table is one shift.
---
def can_partition(xs):
    total = sum(xs)
    if total % 2:
        return False
    reachable = 1
    for x in xs:
        reachable |= reachable << x
    return bool(reachable >> (total // 2) & 1)

def min_difference(xs):
    total = sum(xs)
    reachable = 1
    for x in xs:
        reachable |= reachable << x
    half = total // 2
    best = max(s for s in range(half + 1) if reachable >> s & 1)
    return total - 2 * best

print(can_partition([1, 5, 11, 5]), can_partition([1, 2, 5]), min_difference([3, 1, 4, 2, 2]))
