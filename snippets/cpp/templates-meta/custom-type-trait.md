---
lang: cpp
topic: templates-meta
tier: 3
tags: [template, type-trait, metafunction]
note: A custom trait is just a struct with a static constexpr value; the standard traits are no different.
---
#include <type_traits>

template <typename T>
struct is_pair : std::false_type {};

template <typename A, typename B>
struct is_pair<std::pair<A, B>> : std::true_type {};

template <typename T>
inline constexpr bool is_pair_v = is_pair<T>::value;

template <typename T>
struct rank_of {
    static constexpr int value = 0;
};

template <typename T>
struct rank_of<T*> {
    static constexpr int value = 1 + rank_of<T>::value;
};

#include <utility>

int demo() {
    static_assert(is_pair_v<std::pair<int, double>>);
    static_assert(!is_pair_v<int>);
    static_assert(rank_of<int***>::value == 3);
    return rank_of<int**>::value;
}
