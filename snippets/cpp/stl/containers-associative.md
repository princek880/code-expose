---
lang: cpp
topic: stl
tier: 2
tags: [stl, map, unordered-map]
note: map keeps keys ordered in O(log n); unordered_map is O(1) average with no order at all.
---
#include <map>
#include <string>
#include <unordered_map>

int demo() {
    std::map<std::string, int> ordered{{"b", 2}, {"a", 1}};
    ordered["c"] = 3;
    ordered.insert_or_assign("a", 10);
    auto [it, inserted] = ordered.try_emplace("d", 4);

    std::unordered_map<std::string, int> fast;
    fast.reserve(64);
    fast.emplace("x", 1);
    fast["y"] += 5;

    int total = 0;
    for (const auto& [k, v] : ordered) total += v;
    return total + fast.at("y") + static_cast<int>(inserted) + static_cast<int>(it->second);
}
