---
lang: python
topic: dsa
tier: 3
tags: [difference-array, range-update]
note: Range updates become two point writes; one prefix pass at the end materialises them.
---
def apply_ranges(n, updates):
    diff = [0] * (n + 1)
    for lo, hi, delta in updates:
        diff[lo] += delta
        diff[hi + 1] -= delta
    out, running = [], 0
    for i in range(n):
        running += diff[i]
        out.append(running)
    return out

print(apply_ranges(6, [(0, 2, 5), (1, 4, -2), (3, 5, 1)]))
