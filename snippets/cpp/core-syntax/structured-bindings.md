---
lang: cpp
topic: core-syntax
tier: 2
tags: [structured-bindings, tuple, map]
note: Structured bindings work on tuples, pairs, arrays and any struct with public members.
---
#include <map>
#include <string>
#include <tuple>

std::tuple<int, double, std::string> triple() { return {1, 2.5, "three"}; }

int demo() {
    auto [i, d, s] = triple();
    std::map<std::string, int> counts{{"a", 1}, {"b", 2}};

    int total = 0;
    for (const auto& [key, value] : counts) {
        total += value + static_cast<int>(key.size());
    }
    if (auto [it, inserted] = counts.try_emplace("c", 3); inserted) {
        total += it->second;
    }
    return total + i + static_cast<int>(d) + static_cast<int>(s.size());
}
