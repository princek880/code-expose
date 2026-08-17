---
lang: cpp
topic: dsa
tier: 2
tags: [prefix-sum, unordered-map]
note: A length n+1 prefix vector removes the index-zero special case, same as the Python version.
---
#include <numeric>
#include <unordered_map>
#include <vector>

std::vector<long long> build(const std::vector<int>& xs) {
    std::vector<long long> p(xs.size() + 1, 0);
    std::partial_sum(xs.begin(), xs.end(), p.begin() + 1);
    return p;
}

int count_subarrays_summing_to(const std::vector<int>& xs, int target) {
    std::unordered_map<long long, int> seen{{0, 1}};
    long long running = 0;
    int total = 0;
    for (int x : xs) {
        running += x;
        auto it = seen.find(running - target);
        if (it != seen.end()) total += it->second;
        ++seen[running];
    }
    return total;
}

int demo() {
    auto p = build({1, 2, 3, 4, 5});
    return static_cast<int>(p[4] - p[1]) + count_subarrays_summing_to({1, 1, 1}, 2);
}
