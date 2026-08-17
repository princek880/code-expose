---
lang: python
topic: dsa
tier: 3
tags: [quicksort, hoare, partition]
note: Hoare does fewer swaps than Lomuto, but the recursion must split on j, not on i.
---
def quicksort(xs, lo=0, hi=None):
    if hi is None:
        hi = len(xs) - 1
    if lo >= hi:
        return xs
    pivot = xs[(lo + hi) // 2]
    i, j = lo - 1, hi + 1
    while True:
        i += 1
        while xs[i] < pivot:
            i += 1
        j -= 1
        while xs[j] > pivot:
            j -= 1
        if i >= j:
            break
        xs[i], xs[j] = xs[j], xs[i]
    quicksort(xs, lo, j)
    quicksort(xs, j + 1, hi)
    return xs

print(quicksort([5, 2, 9, 1, 5, 6, 0]))
