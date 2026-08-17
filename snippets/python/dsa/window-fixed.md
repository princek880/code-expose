---
lang: python
topic: dsa
tier: 2
tags: [sliding-window, fixed]
note: Add the entering element, subtract the leaving one; never re-sum the window.
---
def max_window_sum(xs, k):
    cur = sum(xs[:k])
    best = cur
    for i in range(k, len(xs)):
        cur += xs[i] - xs[i - k]
        best = max(best, cur)
    return best

def averages(xs, k):
    cur, out = sum(xs[:k]), []
    out.append(cur / k)
    for i in range(k, len(xs)):
        cur += xs[i] - xs[i - k]
        out.append(cur / k)
    return out

print(max_window_sum([2, 1, 5, 1, 3, 2], 3), averages([1, 2, 3, 4], 2))
