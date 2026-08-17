---
lang: cpp
topic: stl
tier: 2
tags: [stl, iterator, back-inserter]
note: back_inserter turns an output iterator into push_back, so the destination grows as needed.
---
#include <algorithm>
#include <iterator>
#include <vector>

std::size_t demo() {
    std::vector<int> src{1, 2, 3, 4, 5};
    std::vector<int> dst;
    std::copy_if(src.begin(), src.end(), std::back_inserter(dst),
                 [](int x) { return x % 2; });

    auto mid = src.begin() + std::distance(src.begin(), src.end()) / 2;
    std::advance(mid, 1);

    std::vector<int> reversed(src.rbegin(), src.rend());
    return dst.size() + reversed.front() + static_cast<std::size_t>(*mid);
}
