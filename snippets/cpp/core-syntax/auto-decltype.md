---
lang: cpp
topic: core-syntax
tier: 2
tags: [auto, decltype, type-deduction]
note: auto strips references and const; decltype(auto) preserves exactly what the expression is.
---
#include <vector>

std::vector<int> data{1, 2, 3};

int& first_ref() { return data[0]; }

void demo() {
    auto plain = first_ref();
    auto& kept = first_ref();
    decltype(auto) exact = first_ref();
    decltype(data)::size_type n = data.size();

    static_assert(std::is_same_v<decltype(plain), int>);
    static_assert(std::is_same_v<decltype(kept), int&>);
    static_assert(std::is_same_v<decltype(exact), int&>);
    (void)n;
}
