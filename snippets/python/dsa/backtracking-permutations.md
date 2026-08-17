---
lang: python
topic: dsa
tier: 2
tags: [backtracking, permutations]
note: Swapping in place needs no visited set, and it yields each permutation exactly once.
---
def permutations(xs):
    out = []

    def go(k):
        if k == len(xs):
            out.append(xs[:])
            return
        for i in range(k, len(xs)):
            xs[k], xs[i] = xs[i], xs[k]
            go(k + 1)
            xs[k], xs[i] = xs[i], xs[k]

    go(0)
    return out

def permutations_unique(xs):
    out, used, path = [], [False] * len(xs), []
    xs = sorted(xs)

    def go():
        if len(path) == len(xs):
            out.append(path[:])
            return
        for i, x in enumerate(xs):
            if used[i] or (i and x == xs[i - 1] and not used[i - 1]):
                continue
            used[i] = True
            path.append(x)
            go()
            path.pop()
            used[i] = False

    go()
    return out

print(len(permutations([1, 2, 3])), permutations_unique([1, 1, 2]))
