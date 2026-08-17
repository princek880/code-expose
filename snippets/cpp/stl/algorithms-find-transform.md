---
lang: cpp
topic: stl
tier: 2
tags: [stl, find-if, transform]
note: find_if returns end() on failure, so always compare against end() before dereferencing.
---
#include <algorithm>
#include <string>
#include <vector>

std::size_t demo() {
    std::vector<int> v{1, 4, 9, 16};
    auto it = std::find_if(v.begin(), v.end(), [](int x) { return x > 5; });
    int found = it != v.end() ? *it : -1;

    std::vector<std::string> tags(v.size());
    std::transform(v.begin(), v.end(), tags.begin(),
                   [](int x) { return std::to_string(x * 2); });
    std::transform(v.begin(), v.end(), v.begin(), v.begin(), std::plus<>{});

    return static_cast<std::size_t>(found) + tags.back().size() + v.back();
}
