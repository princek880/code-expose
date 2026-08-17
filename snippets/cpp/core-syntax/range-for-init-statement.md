---
lang: cpp
topic: core-syntax
tier: 2
tags: [range-for, if-init, switch]
note: The init-statement scopes a variable to the if or switch, which kills a whole class of leaks.
---
#include <map>
#include <string>
#include <vector>

int demo(std::map<std::string, int>& m, const std::vector<int>& xs) {
    int total = 0;
    for (auto& [key, value] : m) {
        value *= 2;
        total += value;
    }
    for (int x : xs) total += x;

    if (auto it = m.find("a"); it != m.end()) total += it->second;
    switch (int code = total % 3) {
        case 0: total += 100; break;
        case 1: [[fallthrough]];
        case 2: total -= code; break;
    }
    return total;
}
