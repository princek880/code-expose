---
lang: python
topic: dsa
tier: 2
tags: [graph, bfs, shortest-path]
note: BFS gives shortest paths only when every edge weight is equal.
---
from collections import deque

def shortest(graph, src, dst):
    prev, q = {src: None}, deque([src])
    while q:
        u = q.popleft()
        if u == dst:
            break
        for v in graph.get(u, ()):
            if v not in prev:
                prev[v] = u
                q.append(v)
    if dst not in prev:
        return None
    path, node = [], dst
    while node is not None:
        path.append(node)
        node = prev[node]
    return path[::-1]

g = {0: [1, 2], 1: [3], 2: [3], 3: [4], 4: []}
print(shortest(g, 0, 4), shortest(g, 4, 0))
