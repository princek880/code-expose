---
lang: cpp
topic: stl
tier: 2
tags: [stl, all-of, count-if]
note: all_of on an empty range is true and any_of is false; the vacuous cases catch people out.
---
#include <algorithm>
#include <vector>

int demo() {
    std::vector<int> v{2, 4, 6, 8};
    std::vector<int> empty;

    bool all_even = std::all_of(v.begin(), v.end(), [](int x) { return x % 2 == 0; });
    bool any_big = std::any_of(v.begin(), v.end(), [](int x) { return x > 7; });
    bool none_neg = std::none_of(v.begin(), v.end(), [](int x) { return x < 0; });
    auto n = std::count_if(v.begin(), v.end(), [](int x) { return x > 3; });

    return all_even + any_big + none_neg + static_cast<int>(n)
         + std::all_of(empty.begin(), empty.end(), [](int) { return false; });
}
