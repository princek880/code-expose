---
lang: python
topic: dsa
tier: 2
tags: [counting-sort, stable]
note: Walking the input in reverse over the cumulative counts is what preserves stability.
---
def counting_sort(xs, k):
    counts = [0] * (k + 1)
    for x in xs:
        counts[x] += 1
    for i in range(1, k + 1):
        counts[i] += counts[i - 1]
    out = [0] * len(xs)
    for x in reversed(xs):
        counts[x] -= 1
        out[counts[x]] = x
    return out

print(counting_sort([4, 1, 3, 1, 4, 0, 2], 4))
