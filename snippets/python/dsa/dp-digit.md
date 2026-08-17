---
lang: python
topic: dsa
tier: 4
tags: [dp, digit-dp, tight]
note: The tight flag says the prefix still equals N's prefix, which caps the next digit.
---
from functools import lru_cache

def count_with_digit_sum(n, target):
    digits = tuple(int(c) for c in str(n))

    @lru_cache(maxsize=None)
    def go(i, total, tight):
        if i == len(digits):
            return int(total == target)
        limit = digits[i] if tight else 9
        return sum(
            go(i + 1, total + d, tight and d == limit)
            for d in range(limit + 1)
            if total + d <= target
        )

    return go(0, 0, True)

print(count_with_digit_sum(100, 5), count_with_digit_sum(9999, 36))
