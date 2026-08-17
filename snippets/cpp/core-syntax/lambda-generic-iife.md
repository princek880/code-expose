---
lang: cpp
topic: core-syntax
tier: 3
tags: [lambda, generic-lambda, iife]
note: An immediately-invoked lambda lets you initialise a const with a multi-statement computation.
---
#include <string>
#include <vector>

int demo() {
    const auto table = [] {
        std::vector<int> out;
        for (int i = 0; i < 8; ++i) out.push_back(i * i);
        return out;
    }();

    auto twice = [](auto x) { return x + x; };
    auto sum = [](auto... xs) { return (xs + ... + 0); };

    return table.back() + twice(3) + static_cast<int>(twice(std::string("ab")).size())
         + sum(1, 2, 3);
}
