---
lang: cpp
topic: templates-meta
tier: 3
tags: [concepts, requires, constraint]
note: A requires clause is a named boolean gate; the compiler rejects the overload with your message, not a wall of SFINAE.
---
#include <concepts>

template <typename T>
requires std::integral<T>
T half(T x) {
    return x / 2;
}

template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
T doubled(T x) {
    return x + x;
}

int demo() {
    int a = half(10);
    double b = doubled(1.5);
    return a + static_cast<int>(b);
}
