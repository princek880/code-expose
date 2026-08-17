---
lang: python
topic: dsa
tier: 3
tags: [monotonic-deque, sliding-window]
note: The deque holds indices in decreasing value order, so the front is always the window max.
---
from collections import deque

def window_max(xs, k):
    dq, out = deque(), []
    for i, x in enumerate(xs):
        while dq and xs[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(xs[dq[0]])
    return out

print(window_max([1, 3, -1, -3, 5, 3, 6, 7], 3))
