---
lang: python
topic: dsa
tier: 2
tags: [graph, dfs, backtracking]
note: Append on the way down and pop on the way up; that pop is the backtrack.
---
def all_paths(graph, src, dst):
    out, path = [], []

    def walk(u):
        path.append(u)
        if u == dst:
            out.append(path[:])
        else:
            for v in graph.get(u, ()):
                if v not in path:
                    walk(v)
        path.pop()

    walk(src)
    return out

g = {0: [1, 2], 1: [2, 3], 2: [3], 3: []}
print(all_paths(g, 0, 3))
