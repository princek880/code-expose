---
lang: cpp
topic: templates-meta
tier: 4
tags: [template, sfinae, void-t, detection-idiom]
note: void_t maps any well-formed expression to void, which is the whole trick behind detection.
---
#include <type_traits>
#include <vector>

template <typename T, typename = void>
struct has_size : std::false_type {};

template <typename T>
struct has_size<T, std::void_t<decltype(std::declval<T>().size())>> : std::true_type {};

template <typename T, typename = void>
struct has_push_back : std::false_type {};

template <typename T>
struct has_push_back<T, std::void_t<decltype(std::declval<T&>().push_back(std::declval<typename T::value_type>()))>>
    : std::true_type {};

int demo() {
    static_assert(has_size<std::vector<int>>::value);
    static_assert(!has_size<int>::value);
    static_assert(has_push_back<std::vector<int>>::value);
    return has_size<std::vector<int>>::value + has_push_back<std::vector<int>>::value;
}
