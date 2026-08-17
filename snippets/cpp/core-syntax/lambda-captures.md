---
lang: cpp
topic: core-syntax
tier: 2
tags: [lambda, capture, mutable]
note: [=] copies, [&] aliases, and mutable makes the copy writable inside the body.
---
#include <vector>
#include <numeric>

int demo() {
    int total = 0, factor = 3;
    std::vector<int> xs{1, 2, 3, 4};

    auto by_ref = [&](int x) { total += x * factor; };
    auto by_val = [=](int x) { return x * factor + total; };
    auto counter = [n = 0]() mutable { return ++n; };

    for (int x : xs) by_ref(x);
    counter(); counter();
    return total + by_val(2) + counter();
}
