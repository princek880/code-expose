---
lang: python
topic: dsa
tier: 3
tags: [binary-search, lower-bound]
note: lower_bound and upper_bound differ by one character: < versus <=.
---
def lower_bound(xs, target):
    lo, hi = 0, len(xs)
    while lo < hi:
        mid = (lo + hi) // 2
        if xs[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo

def upper_bound(xs, target):
    lo, hi = 0, len(xs)
    while lo < hi:
        mid = (lo + hi) // 2
        if xs[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return lo

xs = [1, 2, 2, 2, 5]
print(lower_bound(xs, 2), upper_bound(xs, 2), upper_bound(xs, 2) - lower_bound(xs, 2))
