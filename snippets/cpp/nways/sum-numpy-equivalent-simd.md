---
lang: cpp
topic: nways
tier: 3
tags: [nways, sum, vectorization]
note: -O2 auto-vectorizes this loop into SIMD adds; std::accumulate on the same data compiles to the identical assembly.
---
#include <numeric>
#include <vector>

int demo() {
    std::vector<int> xs(1000);
    for (int i = 0; i < 1000; ++i) xs[static_cast<std::size_t>(i)] = i;

    long long manual = 0;
    for (int x : xs) manual += x;

    long long via_accumulate = std::accumulate(xs.begin(), xs.end(), 0LL);
    return static_cast<int>(manual == via_accumulate) + static_cast<int>(manual % 1000);
}
