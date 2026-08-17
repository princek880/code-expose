---
lang: cpp
topic: dsa
tier: 3
tags: [graph, dijkstra, priority-queue]
note: A pair<distance, node> in a min-heap priority_queue with std::greater is C++'s Dijkstra idiom.
---
#include <functional>
#include <limits>
#include <queue>
#include <utility>
#include <vector>

std::vector<long long> dijkstra(const std::vector<std::vector<std::pair<int, int>>>& adj, int src) {
    const long long INF = std::numeric_limits<long long>::max();
    std::vector<long long> dist(adj.size(), INF);
    dist[static_cast<std::size_t>(src)] = 0;
    using P = std::pair<long long, int>;
    std::priority_queue<P, std::vector<P>, std::greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[static_cast<std::size_t>(u)]) continue;
        for (auto [v, w] : adj[static_cast<std::size_t>(u)]) {
            long long nd = d + w;
            if (nd < dist[static_cast<std::size_t>(v)]) {
                dist[static_cast<std::size_t>(v)] = nd;
                pq.push({nd, v});
            }
        }
    }
    return dist;
}

int demo() {
    std::vector<std::vector<std::pair<int, int>>> adj{{{1, 1}, {2, 4}}, {{2, 2}, {3, 6}}, {{3, 3}}, {}};
    auto dist = dijkstra(adj, 0);
    return static_cast<int>(dist[3]);
}
