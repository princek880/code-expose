---
lang: python
topic: dsa
tier: 4
tags: [graph, scc, kosaraju]
note: Two passes: finish-order on the graph, then plain DFS on the reverse in that order.
---
def kosaraju(graph):
    seen, order = set(), []

    def dfs(u):
        seen.add(u)
        for v in graph.get(u, ()):
            if v not in seen:
                dfs(v)
        order.append(u)

    for u in graph:
        if u not in seen:
            dfs(u)

    rev = {u: [] for u in graph}
    for u, vs in graph.items():
        for v in vs:
            rev.setdefault(v, []).append(u)

    seen.clear()
    comps = []
    for u in reversed(order):
        if u in seen:
            continue
        comp, stack = [], [u]
        seen.add(u)
        while stack:
            x = stack.pop()
            comp.append(x)
            for y in rev.get(x, ()):
                if y not in seen:
                    seen.add(y)
                    stack.append(y)
        comps.append(sorted(comp))
    return comps

print(kosaraju({0: [1], 1: [2], 2: [0, 3], 3: [4], 4: [3]}))
