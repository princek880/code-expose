---
lang: python
topic: dsa
tier: 2
tags: [backtracking, subsets, bitmask]
note: The include/exclude recursion and the bitmask loop enumerate the same 2**n sets.
---
def subsets(xs):
    out, path = [], []

    def go(i):
        if i == len(xs):
            out.append(path[:])
            return
        go(i + 1)
        path.append(xs[i])
        go(i + 1)
        path.pop()

    go(0)
    return out

def subsets_bitmask(xs):
    n = len(xs)
    return [[xs[i] for i in range(n) if mask >> i & 1] for mask in range(1 << n)]

print(len(subsets([1, 2, 3])), sorted(map(tuple, subsets_bitmask([1, 2]))))
