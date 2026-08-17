---
lang: cpp
topic: dsa
tier: 2
tags: [backtracking, permutations, swap]
note: Swap-based permutation generation needs no visited array, mirroring the Python in-place version.
---
#include <vector>

void go(std::vector<int>& xs, int k, std::vector<std::vector<int>>& out) {
    if (k == static_cast<int>(xs.size())) {
        out.push_back(xs);
        return;
    }
    for (int i = k; i < static_cast<int>(xs.size()); ++i) {
        std::swap(xs[static_cast<std::size_t>(k)], xs[static_cast<std::size_t>(i)]);
        go(xs, k + 1, out);
        std::swap(xs[static_cast<std::size_t>(k)], xs[static_cast<std::size_t>(i)]);
    }
}

int demo() {
    std::vector<int> xs{1, 2, 3};
    std::vector<std::vector<int>> out;
    go(xs, 0, out);
    return static_cast<int>(out.size());
}
