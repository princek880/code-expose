---
lang: cpp
topic: templates-meta
tier: 4
tags: [concepts, requires-expression, custom-concept]
note: A requires-expression checks that expressions compile; it never runs them at runtime.
---
#include <concepts>
#include <cstddef>

template <typename T>
concept Container = requires(T t) {
    { t.size() } -> std::convertible_to<std::size_t>;
    { t.begin() } -> std::same_as<typename T::iterator>;
    typename T::value_type;
};

#include <vector>

template <Container C>
std::size_t total_size(const C& c) {
    return c.size();
}

int demo() {
    std::vector<int> v{1, 2, 3};
    static_assert(Container<std::vector<int>>);
    static_assert(!Container<int>);
    return static_cast<int>(total_size(v));
}
