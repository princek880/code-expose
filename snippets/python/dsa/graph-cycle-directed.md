---
lang: python
topic: dsa
tier: 2
tags: [graph, cycle, dfs]
note: A back edge to a node still on the recursion stack is a cycle; a black node is not.
---
def has_cycle(graph):
    state = {}

    def visit(u):
        state[u] = 1
        for v in graph.get(u, ()):
            if state.get(v) == 1:
                return True
            if state.get(v) is None and visit(v):
                return True
        state[u] = 2
        return False

    return any(visit(u) for u in graph if state.get(u) is None)

print(has_cycle({0: [1], 1: [2], 2: []}))
print(has_cycle({0: [1], 1: [2], 2: [0]}))
