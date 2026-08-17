---
lang: python
topic: dsa
tier: 3
tags: [graph, topological-sort, dfs]
note: Post-order push then reverse; the three-colour marking is what detects the cycle.
---
def topo(graph):
    WHITE, GREY, BLACK = 0, 1, 2
    color = {u: WHITE for u in graph}
    out = []

    def visit(u):
        if color[u] == GREY:
            raise ValueError("cycle at " + str(u))
        if color[u] == BLACK:
            return
        color[u] = GREY
        for v in graph.get(u, ()):
            visit(v)
        color[u] = BLACK
        out.append(u)

    for u in graph:
        visit(u)
    return out[::-1]

print(topo({"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": []}))
