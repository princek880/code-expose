---
lang: cpp
topic: stl
tier: 3
tags: [stl, unique, rotate, partition]
note: unique only collapses adjacent duplicates, so sort first unless adjacency is what you meant.
---
#include <algorithm>
#include <vector>

std::size_t demo() {
    std::vector<int> v{3, 1, 3, 2, 1, 2};
    std::sort(v.begin(), v.end());
    v.erase(std::unique(v.begin(), v.end()), v.end());

    std::rotate(v.begin(), v.begin() + 1, v.end());
    auto split = std::partition(v.begin(), v.end(), [](int x) { return x % 2; });
    std::vector<int> w{5, 3, 9, 1, 7};
    std::nth_element(w.begin(), w.begin() + 2, w.end());

    return v.size() + static_cast<std::size_t>(std::distance(v.begin(), split)) + w[2];
}
