---
lang: python
topic: dsa
tier: 3
tags: [mst, kruskal, union-find]
note: Sort the edges once, then union-find decides which ones would close a cycle.
---
def kruskal(n, edges):
    parent = list(range(n))

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    total, tree = 0, []
    for w, u, v in sorted(edges):
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[rv] = ru
            total += w
            tree.append((u, v, w))
    return total, tree

edges = [(1, 0, 1), (4, 0, 2), (2, 1, 2), (6, 1, 3), (3, 2, 3)]
print(kruskal(4, edges))
