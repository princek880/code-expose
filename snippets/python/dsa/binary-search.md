---
lang: python
topic: dsa
tier: 2
tags: [binary-search, invariant]
note: Half-open [lo, hi) with lo = mid + 1 is the variant that cannot loop forever.
---
def search(xs, target):
    lo, hi = 0, len(xs)
    while lo < hi:
        mid = (lo + hi) // 2
        if xs[mid] == target:
            return mid
        if xs[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return -1

xs = [1, 3, 5, 7, 9, 11]
print(search(xs, 7), search(xs, 8))
