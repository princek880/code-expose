---
lang: python
topic: dsa
tier: 3
tags: [graph, topological-sort, kahn]
note: If the output is shorter than the node count, the leftover nodes form a cycle.
---
from collections import deque, defaultdict

def topo(nodes, edges):
    graph, indeg = defaultdict(list), {n: 0 for n in nodes}
    for u, v in edges:
        graph[u].append(v)
        indeg[v] += 1
    q = deque(n for n in nodes if indeg[n] == 0)
    out = []
    while q:
        u = q.popleft()
        out.append(u)
        for v in graph[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return out if len(out) == len(nodes) else None

print(topo("abcde", [("a", "b"), ("a", "c"), ("b", "d"), ("c", "d"), ("d", "e")]))
print(topo("xy", [("x", "y"), ("y", "x")]))
