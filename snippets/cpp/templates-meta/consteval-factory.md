---
lang: cpp
topic: templates-meta
tier: 4
tags: [consteval, factory, immediate-function]
note: consteval forces evaluation at compile time; calling it with a runtime argument is a hard error.
---
#include <array>
#include <string_view>

consteval std::size_t hash_fnv1a(std::string_view s) {
    std::size_t h = 14695981039346656037ull;
    for (char c : s) {
        h ^= static_cast<unsigned char>(c);
        h *= 1099511628211ull;
    }
    return h;
}

template <std::size_t N>
struct FixedString {
    char data[N]{};
    consteval FixedString(const char (&s)[N]) {
        for (std::size_t i = 0; i < N; ++i) data[i] = s[i];
    }
};

template <FixedString Name>
consteval std::size_t id_of() {
    return hash_fnv1a(Name.data);
}

int demo() {
    constexpr auto h = hash_fnv1a("engine");
    constexpr auto id = id_of<"engine">();
    return static_cast<int>((h ^ id) % 1000);
}
