---
lang: cpp
topic: stl
tier: 3
tags: [span, non-owning, array]
note: span is a pointer plus a length, so one function signature accepts array, vector and C buffer.
---
#include <array>
#include <cstddef>
#include <span>
#include <vector>

int total(std::span<const int> values) {
    int sum = 0;
    for (int v : values) sum += v;
    return sum;
}

int demo() {
    int raw[4]{1, 2, 3, 4};
    std::vector<int> vec{5, 6};
    std::array<int, 3> arr{7, 8, 9};

    auto head = std::span{raw}.first(2);
    auto tail = std::span{arr}.subspan(1);
    return total(raw) + total(vec) + total(arr) + total(head) + total(tail);
}
