---
lang: cpp
topic: core-syntax
tier: 3
tags: [move, rvalue-reference, std-move]
note: std::move only casts to an rvalue; the moved-from object is valid but unspecified.
---
#include <string>
#include <utility>
#include <vector>

std::vector<std::string> build() {
    std::vector<std::string> out;
    out.reserve(4);
    std::string tmp = "hello";
    out.push_back(tmp);
    out.push_back(std::move(tmp));
    out.emplace_back("world");
    return out;
}

std::size_t demo() {
    auto v = build();
    auto stolen = std::move(v);
    v.clear();
    return stolen.size() + v.size();
}
