---
lang: cpp
topic: dsa
tier: 2
tags: [binary-search, lower-bound, upper-bound]
note: std::lower_bound and std::upper_bound are the C++ standard library's binary_search primitives.
---
#include <algorithm>
#include <vector>

int demo() {
    std::vector<int> xs{1, 2, 2, 2, 5};
    auto lo = std::lower_bound(xs.begin(), xs.end(), 2);
    auto hi = std::upper_bound(xs.begin(), xs.end(), 2);
    bool present = std::binary_search(xs.begin(), xs.end(), 5);
    return static_cast<int>(std::distance(lo, hi)) + static_cast<int>(present);
}
