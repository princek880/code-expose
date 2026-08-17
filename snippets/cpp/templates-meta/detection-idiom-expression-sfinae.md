---
lang: cpp
topic: templates-meta
tier: 4
tags: [template, detection-idiom, expression-sfinae]
note: A trailing decltype on the expression itself is expression SFINAE, no enable_if machinery needed.
---
#include <type_traits>
#include <utility>

template <typename T>
auto call_it(T&& obj) -> decltype(obj(), void()) {
    obj();
}

void call_it(...) {}

template <typename T, typename U>
auto less_than(const T& a, const U& b) -> decltype(a < b) {
    return a < b;
}

int demo() {
    int calls = 0;
    call_it([&] { ++calls; });
    call_it(42);
    return calls + static_cast<int>(less_than(1, 2.5));
}
