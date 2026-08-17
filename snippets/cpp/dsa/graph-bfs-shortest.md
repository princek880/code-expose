---
lang: cpp
topic: dsa
tier: 2
tags: [graph, bfs, shortest-path]
note: BFS over an unweighted adjacency list gives shortest paths, same guarantee as the Python version.
---
#include <queue>
#include <vector>

int shortest(const std::vector<std::vector<int>>& adj, int src, int dst) {
    std::vector<int> dist(adj.size(), -1);
    dist[static_cast<std::size_t>(src)] = 0;
    std::queue<int> q;
    q.push(src);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        if (u == dst) return dist[static_cast<std::size_t>(u)];
        for (int v : adj[static_cast<std::size_t>(u)]) {
            if (dist[static_cast<std::size_t>(v)] == -1) {
                dist[static_cast<std::size_t>(v)] = dist[static_cast<std::size_t>(u)] + 1;
                q.push(v);
            }
        }
    }
    return -1;
}

int demo() {
    std::vector<std::vector<int>> adj{{1, 2}, {3}, {3}, {4}, {}};
    return shortest(adj, 0, 4);
}
