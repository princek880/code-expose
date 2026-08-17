---
lang: cpp
topic: core-syntax
tier: 3
tags: [lambda, std-function, type-erasure]
note: std::function type-erases and may heap-allocate; a template parameter keeps the lambda inline.
---
#include <functional>
#include <vector>

int apply_erased(const std::function<int(int)>& fn, int x) { return fn(x); }

template <typename F>
int apply_inline(F&& fn, int x) { return fn(x); }

int demo() {
    int bias = 10;
    std::function<int(int)> erased = [bias](int x) { return x * 2 + bias; };
    std::vector<std::function<int()>> jobs;
    jobs.emplace_back([] { return 1; });
    jobs.emplace_back([bias] { return bias; });

    int total = 0;
    for (const auto& job : jobs) total += job();
    return apply_erased(erased, 5) + apply_inline([](int x) { return x - 1; }, 3) + total;
}
