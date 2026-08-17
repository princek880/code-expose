---
lang: cpp
topic: templates-meta
tier: 4
tags: [template, template-template-parameter]
note: A template template parameter binds to the container itself, not to one instantiation of it.
---
#include <deque>
#include <vector>

template <template <typename, typename...> class Container, typename T>
Container<T> repeat(const T& value, int n) {
    Container<T> out;
    for (int i = 0; i < n; ++i) out.push_back(value);
    return out;
}

int demo() {
    auto v = repeat<std::vector>(3, 4);
    auto d = repeat<std::deque>(std::string("x"), 2);
    return static_cast<int>(v.size()) + static_cast<int>(d.size());
}
