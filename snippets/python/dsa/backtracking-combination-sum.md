---
lang: python
topic: dsa
tier: 3
tags: [backtracking, combinations, pruning]
note: Passing the start index forward is what stops the same combination appearing reordered.
---
def combination_sum(candidates, target):
    out, path = [], []
    candidates = sorted(candidates)

    def go(start, remaining):
        if remaining == 0:
            out.append(path[:])
            return
        for i in range(start, len(candidates)):
            c = candidates[i]
            if c > remaining:
                break
            path.append(c)
            go(i, remaining - c)
            path.pop()

    go(0, target)
    return out

print(combination_sum([2, 3, 6, 7], 7))
