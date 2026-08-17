---
lang: cpp
topic: templates-meta
tier: 3
tags: [concepts, auto, subsumption]
note: A concept on auto reads like a type but still constrains the deduced argument at the call site.
---
#include <concepts>

auto add(std::integral auto a, std::integral auto b) {
    return a + b;
}

template <std::floating_point T>
T average(T a, T b) {
    return (a + b) / 2;
}

std::integral auto clamp_positive(std::integral auto x) {
    return x < 0 ? 0 : x;
}

int demo() {
    auto a = add(3, 4);
    double b = average(1.0, 3.0);
    auto c = clamp_positive(-5);
    return a + static_cast<int>(b) + c;
}
