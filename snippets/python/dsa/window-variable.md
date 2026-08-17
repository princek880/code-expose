---
lang: python
topic: dsa
tier: 3
tags: [sliding-window, variable]
note: Grow on the right unconditionally, then shrink from the left until the invariant holds.
---
def longest_at_most_k_distinct(s, k):
    counts, left, best = {}, 0, 0
    for right, ch in enumerate(s):
        counts[ch] = counts.get(ch, 0) + 1
        while len(counts) > k:
            counts[s[left]] -= 1
            if counts[s[left]] == 0:
                del counts[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best

def min_subarray_at_least(xs, target):
    left, cur, best = 0, 0, len(xs) + 1
    for right, x in enumerate(xs):
        cur += x
        while cur >= target:
            best = min(best, right - left + 1)
            cur -= xs[left]
            left += 1
    return best if best <= len(xs) else 0

print(longest_at_most_k_distinct("eceba", 2), min_subarray_at_least([2, 3, 1, 2, 4, 3], 7))
