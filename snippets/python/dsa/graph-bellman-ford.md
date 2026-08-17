---
lang: python
topic: dsa
tier: 3
tags: [graph, bellman-ford, negative-weights]
note: n-1 rounds suffice; a change on round n means a reachable negative cycle.
---
def bellman_ford(n, edges, src):
    dist = [float("inf")] * n
    dist[src] = 0
    for _ in range(n - 1):
        changed = False
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                changed = True
        if not changed:
            break
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None
    return dist

edges = [(0, 1, 4), (0, 2, 5), (1, 2, -3), (2, 3, 4)]
print(bellman_ford(4, edges, 0))
print(bellman_ford(2, [(0, 1, 1), (1, 0, -3)], 0))
