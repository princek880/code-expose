---
lang: cpp
topic: core-syntax
tier: 4
tags: [constinit, static-initialization, thread-safe]
note: constinit guarantees static initialisation, killing the static initialisation order fiasco.
---
#include <string_view>

constinit int counter = 0;
constinit std::string_view kName = "engine";

int& lazy_singleton() {
    static int value = 41;
    return value;
}

struct Registrar {
    static inline int registered = 0;
    Registrar() { ++registered; }
};

int demo() {
    ++counter;
    Registrar r;
    return counter + static_cast<int>(kName.size()) + lazy_singleton() + Registrar::registered;
}
