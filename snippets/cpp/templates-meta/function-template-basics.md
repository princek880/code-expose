---
lang: cpp
topic: templates-meta
tier: 2
tags: [template, function-template]
note: The compiler deduces T from the argument; you only spell it out when deduction is ambiguous.
---
template <typename T>
T max_of(T a, T b) {
    return a > b ? a : b;
}

template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

int demo() {
    int a = max_of(3, 7);
    double d = max_of(1.5, 0.5);
    auto mixed = add(3, 4.5);
    auto explicit_t = max_of<double>(2, 3.9);
    return a + static_cast<int>(d) + static_cast<int>(mixed) + static_cast<int>(explicit_t);
}
