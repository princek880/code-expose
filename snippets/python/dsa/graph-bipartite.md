---
lang: python
topic: dsa
tier: 2
tags: [graph, bipartite, coloring]
note: Two-colour by BFS; an edge to an equally coloured neighbour proves an odd cycle.
---
from collections import deque

def bipartite(graph):
    color = {}
    for start in graph:
        if start in color:
            continue
        color[start] = 0
        q = deque([start])
        while q:
            u = q.popleft()
            for v in graph[u]:
                if v not in color:
                    color[v] = color[u] ^ 1
                    q.append(v)
                elif color[v] == color[u]:
                    return None
    return color

print(bipartite({0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}))
print(bipartite({0: [1, 2], 1: [0, 2], 2: [0, 1]}))
