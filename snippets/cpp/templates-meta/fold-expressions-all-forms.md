---
lang: cpp
topic: templates-meta
tier: 3
tags: [template, fold-expression, variadic]
note: The four fold forms differ by which side the operator and the ... land on relative to the pack.
---
#include <string>

template <typename... Ts>
auto sum_right(Ts... xs) { return (xs + ...); }

template <typename... Ts>
auto sum_left(Ts... xs) { return (... + xs); }

template <typename... Ts>
auto sum_init(Ts... xs) { return (xs + ... + 0); }

template <typename... Ts>
bool all_true(Ts... xs) { return (... && xs); }

int demo() {
    int a = sum_right(1, 2, 3);
    int b = sum_left(1, 2, 3);
    int c = sum_init();
    bool d = all_true(true, true, 1 > 0);
    return a + b + c + static_cast<int>(d);
}
