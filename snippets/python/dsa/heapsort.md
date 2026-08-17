---
lang: python
topic: dsa
tier: 3
tags: [heapsort, sift-down]
note: Build the max-heap bottom-up from n//2 - 1; only internal nodes need sifting.
---
def heapsort(xs):
    n = len(xs)

    def sift(root, end):
        while True:
            child = 2 * root + 1
            if child >= end:
                return
            if child + 1 < end and xs[child + 1] > xs[child]:
                child += 1
            if xs[root] >= xs[child]:
                return
            xs[root], xs[child] = xs[child], xs[root]
            root = child

    for start in range(n // 2 - 1, -1, -1):
        sift(start, n)
    for end in range(n - 1, 0, -1):
        xs[0], xs[end] = xs[end], xs[0]
        sift(0, end)
    return xs

print(heapsort([5, 2, 9, 1, 5, 6, 0]))
