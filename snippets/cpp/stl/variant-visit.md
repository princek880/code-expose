---
lang: cpp
topic: stl
tier: 3
tags: [variant, visit, overloaded]
note: An overload set built from lambdas is how you write a type switch that the compiler checks.
---
#include <string>
#include <variant>

template <typename... Fs>
struct overloaded : Fs... {
    using Fs::operator()...;
};

using Value = std::variant<int, double, std::string>;

std::size_t describe(const Value& v) {
    return std::visit(overloaded{
        [](int i) { return static_cast<std::size_t>(i); },
        [](double d) { return static_cast<std::size_t>(d * 2); },
        [](const std::string& s) { return s.size(); },
    }, v);
}

std::size_t demo() {
    Value a = 21, b = 1.5, c = std::string("hello");
    return describe(a) + describe(b) + describe(c)
         + a.index() + static_cast<std::size_t>(std::holds_alternative<int>(a));
}
