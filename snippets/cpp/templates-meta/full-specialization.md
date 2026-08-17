---
lang: cpp
topic: templates-meta
tier: 3
tags: [template, specialization]
note: A full specialization must match the primary template's parameter list exactly.
---
#include <string>

template <typename T>
struct Describe {
    static const char* name() { return "unknown"; }
};

template <>
struct Describe<int> {
    static const char* name() { return "int"; }
};

template <>
struct Describe<std::string> {
    static const char* name() { return "string"; }
};

int demo() {
    std::string a = Describe<int>::name();
    std::string b = Describe<std::string>::name();
    std::string c = Describe<double>::name();
    return static_cast<int>(a.size() + b.size() + c.size());
}
