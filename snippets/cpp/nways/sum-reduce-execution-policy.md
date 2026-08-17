---
lang: cpp
topic: nways
tier: 3
tags: [nways, sum, reduce, execution-policy]
note: std::reduce with an execution policy may sum out of order, which is only safe when addition truly commutes here.
---
#include <execution>
#include <numeric>
#include <vector>

int demo() {
    std::vector<int> xs(1000);
    for (int i = 0; i < 1000; ++i) xs[static_cast<std::size_t>(i)] = i;

    int sequential = std::reduce(std::execution::seq, xs.begin(), xs.end(), 0);
    int parallel = std::reduce(std::execution::par, xs.begin(), xs.end(), 0);
    return static_cast<int>(sequential == parallel) + sequential % 1000;
}
