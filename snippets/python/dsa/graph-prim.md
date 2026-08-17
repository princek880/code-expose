---
lang: python
topic: dsa
tier: 3
tags: [mst, prim, heap]
note: Prim grows one tree from a seed; Kruskal merges a forest. Same weight, different order.
---
import heapq

def prim(graph, start):
    seen, heap, total, tree = {start}, list(graph[start]), 0, []
    heapq.heapify(heap)
    while heap:
        w, v = heapq.heappop(heap)
        if v in seen:
            continue
        seen.add(v)
        total += w
        tree.append((v, w))
        for nw, nv in graph[v]:
            if nv not in seen:
                heapq.heappush(heap, (nw, nv))
    return total, tree

g = {0: [(1, 1), (4, 2)], 1: [(1, 0), (2, 2), (6, 3)], 2: [(4, 0), (2, 1), (3, 3)], 3: [(6, 1), (3, 2)]}
print(prim(g, 0))
