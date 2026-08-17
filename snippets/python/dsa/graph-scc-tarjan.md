---
lang: python
topic: dsa
tier: 4
tags: [graph, scc, tarjan]
note: low[v] == index[v] marks a root, and the stack above it is exactly one component.
---
def tarjan(graph):
    index, low, on_stack = {}, {}, set()
    stack, out, counter = [], [], 0

    def strong(v):
        nonlocal counter
        index[v] = low[v] = counter
        counter += 1
        stack.append(v)
        on_stack.add(v)
        for w in graph.get(v, ()):
            if w not in index:
                strong(w)
                low[v] = min(low[v], low[w])
            elif w in on_stack:
                low[v] = min(low[v], index[w])
        if low[v] == index[v]:
            comp = []
            while True:
                w = stack.pop()
                on_stack.discard(w)
                comp.append(w)
                if w == v:
                    break
            out.append(sorted(comp))

    for v in graph:
        if v not in index:
            strong(v)
    return out

print(tarjan({0: [1], 1: [2], 2: [0, 3], 3: [4], 4: [3]}))
