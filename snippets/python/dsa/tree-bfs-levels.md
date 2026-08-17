---
lang: python
topic: dsa
tier: 2
tags: [tree, bfs, deque]
note: Snapshot len(queue) at the top of each round and that round is exactly one level.
---
from collections import deque

class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def levels(root):
    if not root:
        return []
    out, q = [], deque([root])
    while q:
        row = []
        for _ in range(len(q)):
            n = q.popleft()
            row.append(n.val)
            if n.left:
                q.append(n.left)
            if n.right:
                q.append(n.right)
        out.append(row)
    return out

root = T(1, T(2, T(4), T(5)), T(3, None, T(6)))
print(levels(root), [row[-1] for row in levels(root)])
