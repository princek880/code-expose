---
lang: cpp
topic: templates-meta
tier: 4
tags: [decltype-auto, return-type-deduction]
note: auto in a return type decays like a value; decltype(auto) preserves the reference the expression has.
---
#include <vector>

std::vector<int> data{1, 2, 3, 4};

decltype(auto) at(std::size_t i) {
    return (data[i]);
}

auto at_by_value(std::size_t i) {
    return data[i];
}

template <typename F, typename... Args>
decltype(auto) invoke_and_forward(F&& f, Args&&... args) {
    return f(std::forward<Args>(args)...);
}

int demo() {
    at(0) = 99;
    int copy = at_by_value(0);
    copy += 1;
    int sum = invoke_and_forward([](int a, int b) { return a + b; }, 3, 4);
    return data[0] + copy + sum;
}
