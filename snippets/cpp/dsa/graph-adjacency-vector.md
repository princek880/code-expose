---
lang: cpp
topic: dsa
tier: 2
tags: [graph, adjacency, vector-of-vector]
note: vector<vector<int>> adjacency is the idiomatic C++ graph, indexed by plain node id.
---
#include <vector>

std::vector<std::vector<int>> build(int n, const std::vector<std::pair<int, int>>& edges) {
    std::vector<std::vector<int>> adj(static_cast<std::size_t>(n));
    for (auto [u, v] : edges) {
        adj[static_cast<std::size_t>(u)].push_back(v);
        adj[static_cast<std::size_t>(v)].push_back(u);
    }
    return adj;
}

int demo() {
    auto adj = build(5, {{0, 1}, {0, 2}, {1, 3}, {2, 3}, {3, 4}});
    return static_cast<int>(adj[3].size()) * 10 + static_cast<int>(adj[0].size());
}
