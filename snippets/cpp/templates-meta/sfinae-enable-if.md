---
lang: cpp
topic: templates-meta
tier: 3
tags: [template, sfinae, enable-if]
note: A substitution failure removes the overload from the set silently instead of erroring.
---
#include <type_traits>

template <typename T, std::enable_if_t<std::is_integral_v<T>, int> = 0>
T twice(T x) { return x * 2; }

template <typename T, std::enable_if_t<std::is_floating_point_v<T>, int> = 0>
T twice(T x) { return x * 2.0; }

template <typename T>
std::enable_if_t<std::is_pointer_v<T>, int> address_bits(T p) {
    return p ? 1 : 0;
}

int demo() {
    int a = twice(3);
    double b = twice(2.5);
    int c = 5;
    return a + static_cast<int>(b) + address_bits(&c);
}
