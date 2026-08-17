---
lang: python
topic: dsa
tier: 4
tags: [dp, bitmask, assignment]
note: The mask is the set of used columns, so the state count is 2**n, not n!.
---
from functools import lru_cache

def min_assignment(cost):
    n = len(cost)

    @lru_cache(maxsize=None)
    def go(i, used):
        if i == n:
            return 0
        return min(
            cost[i][j] + go(i + 1, used | (1 << j))
            for j in range(n)
            if not used & (1 << j)
        )

    return go(0, 0)

print(min_assignment([[9, 2, 7], [6, 4, 3], [5, 8, 1]]))
print(bin(0b1011 | 1 << 2), (0b1011 & -0b1011).bit_length() - 1)
