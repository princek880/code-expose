---
lang: cpp
topic: stl
tier: 3
tags: [stl, lower-bound, equal-range]
note: lower_bound gives the first not-less element; upper_bound the first greater. The gap is the run.
---
#include <algorithm>
#include <vector>

std::size_t demo() {
    std::vector<int> v{1, 2, 2, 2, 5, 8};

    auto lo = std::lower_bound(v.begin(), v.end(), 2);
    auto hi = std::upper_bound(v.begin(), v.end(), 2);
    auto [first, last] = std::equal_range(v.begin(), v.end(), 2);
    bool present = std::binary_search(v.begin(), v.end(), 5);

    return static_cast<std::size_t>(std::distance(lo, hi))
         + static_cast<std::size_t>(std::distance(first, last))
         + static_cast<std::size_t>(present);
}
