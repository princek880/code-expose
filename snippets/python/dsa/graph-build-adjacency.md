---
lang: python
topic: dsa
tier: 2
tags: [graph, adjacency]
note: Build both directions for an undirected graph, or half your edges silently vanish.
---
from collections import defaultdict

edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4)]

undirected = defaultdict(list)
for u, v in edges:
    undirected[u].append(v)
    undirected[v].append(u)

directed = defaultdict(list)
weighted = defaultdict(list)
for i, (u, v) in enumerate(edges):
    directed[u].append(v)
    weighted[u].append((v, i + 1))

n = 5
matrix = [[0] * n for _ in range(n)]
for u, v in edges:
    matrix[u][v] = matrix[v][u] = 1
print(dict(undirected)[3], dict(weighted)[0], matrix[0])
