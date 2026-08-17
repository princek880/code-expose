---
lang: cpp
topic: core-syntax
tier: 3
tags: [constexpr, consteval, static-assert]
note: constexpr may run at either time; consteval must run at compile time or fail to compile.
---
#include <array>

constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

consteval int must_be_compile_time(int n) {
    return n * n;
}

constexpr auto table = [] {
    std::array<int, 8> out{};
    for (int i = 0; i < 8; ++i) out[i] = factorial(i);
    return out;
}();

static_assert(factorial(5) == 120);
static_assert(must_be_compile_time(4) == 16);
static_assert(table[6] == 720);

int demo() { return table.back(); }
