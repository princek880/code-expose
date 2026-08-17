---
lang: cpp
topic: low-latency
tier: 2
tags: [emplace-back, push-back, construction]
note: emplace_back constructs the element in place from its arguments; push_back needs a temporary first.
---
#include <string>
#include <vector>

struct Big {
    std::string tag;
    int value{};
    Big(std::string t, int v) : tag(std::move(t)), value(v) {}
};

int demo() {
    std::vector<Big> v;
    v.reserve(4);
    v.push_back(Big("a", 1));
    v.emplace_back("b", 2);
    v.emplace_back(std::string("c"), 3);

    std::vector<std::pair<int, int>> pairs;
    pairs.emplace_back(1, 2);
    pairs.push_back(std::make_pair(3, 4));

    return static_cast<int>(v.size()) + v.back().value + pairs.back().second;
}
