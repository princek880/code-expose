---
lang: cpp
topic: stl
tier: 4
tags: [ranges, join, elements]
note: views::join flattens one level of nesting lazily, without building the intermediate container.
---
#include <ranges>
#include <string>
#include <vector>

std::size_t demo() {
    std::vector<std::vector<int>> nested{{1, 2}, {3}, {4, 5, 6}};
    std::size_t total = 0;
    for (int x : nested | std::views::join) total += static_cast<std::size_t>(x);

    std::vector<std::pair<std::string, int>> pairs{{"a", 1}, {"b", 2}};
    for (const auto& key : pairs | std::views::keys) total += key.size();
    for (int v : pairs | std::views::values) total += static_cast<std::size_t>(v);

    for (int i : std::views::iota(0, static_cast<int>(nested.size()))) {
        total += static_cast<std::size_t>(i) + nested[static_cast<std::size_t>(i)].size();
    }
    return total;
}
