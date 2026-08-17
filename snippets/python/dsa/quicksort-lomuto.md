---
lang: python
topic: dsa
tier: 2
tags: [quicksort, lomuto, partition]
note: Lomuto keeps one write pointer, so the partition is a single forward pass.
---
def quicksort(xs, lo=0, hi=None):
    if hi is None:
        hi = len(xs) - 1
    if lo >= hi:
        return xs
    pivot, i = xs[hi], lo
    for j in range(lo, hi):
        if xs[j] < pivot:
            xs[i], xs[j] = xs[j], xs[i]
            i += 1
    xs[i], xs[hi] = xs[hi], xs[i]
    quicksort(xs, lo, i - 1)
    quicksort(xs, i + 1, hi)
    return xs

print(quicksort([5, 2, 9, 1, 5, 6, 0]))
