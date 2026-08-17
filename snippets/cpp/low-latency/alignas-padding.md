---
lang: cpp
topic: low-latency
tier: 3
tags: [alignas, cache-line, false-sharing]
note: Padding a struct to the cache line size stops two threads' counters from sharing one line.
---
#include <atomic>
#include <cstddef>

struct alignas(64) PaddedCounter {
    std::atomic<long long> value{0};
    char padding[64 - sizeof(std::atomic<long long>)]{};
};

struct Unpadded {
    std::atomic<long long> value{0};
};

int demo() {
    PaddedCounter a, b;
    Unpadded c, d;
    a.value.fetch_add(1);
    b.value.fetch_add(2);
    return static_cast<int>(sizeof(PaddedCounter) == 64) + static_cast<int>(alignof(PaddedCounter) == 64)
         + static_cast<int>(a.value.load() + b.value.load());
}
