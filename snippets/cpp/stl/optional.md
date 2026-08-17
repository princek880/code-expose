---
lang: cpp
topic: stl
tier: 2
tags: [optional, value-or, nullopt]
note: value() throws on empty; value_or never does. Pick deliberately, do not mix them by accident.
---
#include <optional>
#include <string>

std::optional<int> to_int(const std::string& s) {
    if (s.empty() || s.find_first_not_of("0123456789") != std::string::npos) {
        return std::nullopt;
    }
    return std::stoi(s);
}

int demo() {
    auto a = to_int("42");
    auto b = to_int("x");
    int total = a.value_or(0) + b.value_or(-1);
    if (a) total += *a;
    if (auto c = to_int("7"); c.has_value()) total += c.value();
    return total + static_cast<int>(b == std::nullopt);
}
