---
lang: cpp
topic: nways
tier: 3
tags: [nways, parallel-sum, openmp, pragma]
note: The reduction clause gives each thread a private accumulator and sums them at the loop's exit, avoiding a data race.
---
#include <omp.h>
#include <vector>

long long parallel_sum_omp(const std::vector<int>& xs) {
    long long total = 0;
#pragma omp parallel for reduction(+:total)
    for (int i = 0; i < static_cast<int>(xs.size()); ++i) {
        total += xs[static_cast<std::size_t>(i)];
    }
    return total;
}

int demo() {
    std::vector<int> xs(1000, 1);
    long long sequential = 0;
    for (int x : xs) sequential += x;
    long long parallel = parallel_sum_omp(xs);
    return static_cast<int>(sequential == parallel) + static_cast<int>(parallel % 1000);
}
