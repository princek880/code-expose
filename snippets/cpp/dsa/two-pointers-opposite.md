---
lang: cpp
topic: dsa
tier: 2
tags: [two-pointers, sorted]
note: Same sum-driven pointer movement as the Python version, now over an iterator-free index pair.
---
#include <algorithm>
#include <utility>
#include <vector>

std::pair<int, int> two_sum(const std::vector<int>& xs, int target) {
    int i = 0, j = static_cast<int>(xs.size()) - 1;
    while (i < j) {
        int s = xs[static_cast<std::size_t>(i)] + xs[static_cast<std::size_t>(j)];
        if (s == target) return {i, j};
        if (s < target) ++i; else --j;
    }
    return {-1, -1};
}

int max_area(const std::vector<int>& h) {
    int i = 0, j = static_cast<int>(h.size()) - 1, best = 0;
    while (i < j) {
        best = std::max(best, (j - i) * std::min(h[static_cast<std::size_t>(i)], h[static_cast<std::size_t>(j)]));
        if (h[static_cast<std::size_t>(i)] < h[static_cast<std::size_t>(j)]) ++i; else --j;
    }
    return best;
}

int demo() {
    auto [i, j] = two_sum({1, 3, 4, 6, 9}, 10);
    return i + j + max_area({1, 8, 6, 2, 5, 4, 8, 3, 7});
}
