---
lang: python
topic: dsa
tier: 3
tags: [graph, dijkstra, heap]
note: Skip a popped node whose recorded distance is already better; that is the lazy delete.
---
import heapq

def dijkstra(graph, src):
    dist = {src: 0}
    heap = [(0, src)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist.get(u, float("inf")):
            continue
        for v, w in graph.get(u, ()):
            nd = d + w
            if nd < dist.get(v, float("inf")):
                dist[v] = nd
                heapq.heappush(heap, (nd, v))
    return dist

g = {"a": [("b", 1), ("c", 4)], "b": [("c", 2), ("d", 6)], "c": [("d", 3)], "d": []}
print(dijkstra(g, "a"))
