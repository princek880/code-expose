---
lang: cpp
topic: templates-meta
tier: 4
tags: [metaprogramming, typelist, compile-time-list]
note: A typelist is just a struct that never gets instantiated; all the work happens in its template arguments.
---
#include <type_traits>

template <typename... Ts>
struct TypeList {};

template <typename List>
struct Length;

template <typename... Ts>
struct Length<TypeList<Ts...>> {
    static constexpr int value = sizeof...(Ts);
};

template <typename T, typename List>
struct PushFront;

template <typename T, typename... Ts>
struct PushFront<T, TypeList<Ts...>> {
    using type = TypeList<T, Ts...>;
};

template <typename List>
struct Front;

template <typename T, typename... Ts>
struct Front<TypeList<T, Ts...>> {
    using type = T;
};

using List = TypeList<int, double, char>;
using Pushed = PushFront<bool, List>::type;

static_assert(Length<List>::value == 3);
static_assert(Length<Pushed>::value == 4);
static_assert(std::is_same_v<Front<Pushed>::type, bool>);

int demo() { return Length<List>::value + Length<Pushed>::value; }
