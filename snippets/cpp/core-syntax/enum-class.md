---
lang: cpp
topic: core-syntax
tier: 1
tags: [enum-class, scoped-enum, underlying-type]
note: A scoped enum will not convert to int on its own, which is exactly why it is safer.
---
#include <cstdint>
#include <type_traits>

enum class Color : std::uint8_t { Red, Green, Blue };
enum class Flags : unsigned { None = 0, Read = 1, Write = 2, Both = Read | Write };

constexpr Flags operator|(Flags a, Flags b) {
    return static_cast<Flags>(static_cast<unsigned>(a) | static_cast<unsigned>(b));
}

template <typename E>
constexpr auto underlying(E e) {
    return static_cast<std::underlying_type_t<E>>(e);
}

int demo() {
    Color c = Color::Green;
    Flags f = Flags::Read | Flags::Write;
    return static_cast<int>(underlying(c)) + static_cast<int>(underlying(f));
}
