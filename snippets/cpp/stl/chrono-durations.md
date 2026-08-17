---
lang: cpp
topic: stl
tier: 2
tags: [chrono, duration, literals]
note: Durations convert implicitly only when no precision is lost; narrowing needs duration_cast.
---
#include <chrono>

long long demo() {
    using namespace std::chrono;

    auto budget = 250ms;
    auto slice = budget / 5;
    seconds whole = duration_cast<seconds>(1500ms);
    auto micros = duration_cast<microseconds>(slice);
    auto total = budget + 1s;

    double ratio = duration<double>(budget) / duration<double>(1s);
    return micros.count() + whole.count() + total.count() + static_cast<long long>(ratio * 100);
}
