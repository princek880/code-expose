---
lang: cpp
topic: low-latency
tier: 2
tags: [benchmark, chrono, do-not-optimize]
note: A volatile sink forces the optimiser to keep the result, so the whole loop cannot be deleted.
---
#include <chrono>
#include <cstddef>

template <typename T>
void do_not_optimize(const T& value) {
    asm volatile("" : : "r,m"(value) : "memory");
}

template <typename F>
double bench(F&& fn, int iterations) {
    auto start = std::chrono::steady_clock::now();
    for (int i = 0; i < iterations; ++i) {
        auto result = fn();
        do_not_optimize(result);
    }
    auto elapsed = std::chrono::steady_clock::now() - start;
    return std::chrono::duration<double, std::nano>(elapsed).count() / iterations;
}

int demo() {
    int x = 0;
    double ns = bench([&] { return ++x; }, 1000);
    return static_cast<int>(ns >= 0.0) + x;
}
