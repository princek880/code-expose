---
lang: python
topic: dsa
tier: 3
tags: [binary-search, feasibility]
note: Search the answer space when the predicate is monotone: infeasible then feasible.
---
def min_capacity(weights, days):
    def feasible(cap):
        need, cur = 1, 0
        for w in weights:
            if cur + w > cap:
                need, cur = need + 1, 0
            cur += w
        return need <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

print(min_capacity([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5))
