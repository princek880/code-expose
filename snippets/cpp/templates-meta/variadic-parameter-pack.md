---
lang: cpp
topic: templates-meta
tier: 3
tags: [template, variadic, parameter-pack]
note: sizeof...(Args) counts the pack at compile time and costs nothing at runtime.
---
#include <cstddef>

template <typename... Args>
constexpr std::size_t count_args(Args&&...) {
    return sizeof...(Args);
}

template <typename First, typename... Rest>
First first_of(First f, Rest...) {
    return f;
}

void log_all() {}

template <typename First, typename... Rest>
void log_all(First f, Rest... rest) {
    (void)f;
    log_all(rest...);
}

int demo() {
    log_all(1, 2.0, "three");
    return static_cast<int>(count_args(1, 2, 3)) + first_of(10, 20, 30);
}
