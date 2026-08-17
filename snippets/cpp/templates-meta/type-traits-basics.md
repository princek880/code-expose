---
lang: cpp
topic: templates-meta
tier: 2
tags: [template, type-traits]
note: is_same_v compares types exactly, so int and const int are already considered different.
---
#include <type_traits>

template <typename T, typename U>
constexpr bool same_decayed = std::is_same_v<std::decay_t<T>, std::decay_t<U>>;

int demo() {
    static_assert(std::is_same_v<int, int>);
    static_assert(!std::is_same_v<int, const int>);
    static_assert(same_decayed<int&, int>);
    static_assert(std::is_same_v<std::remove_reference_t<int&>, int>);
    static_assert(std::is_same_v<std::conditional_t<(1 < 2), int, double>, int>);
    static_assert(std::is_invocable_v<decltype([](int) {}), int>);
    return 0;
}
