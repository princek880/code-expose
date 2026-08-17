---
lang: cpp
topic: low-latency
tier: 3
tags: [atomic, compare-exchange, cas-loop]
note: compare_exchange_weak can fail spuriously, which is fine because the loop just retries.
---
#include <atomic>

int fetch_max(std::atomic<int>& target, int candidate) {
    int current = target.load(std::memory_order_relaxed);
    while (candidate > current &&
           !target.compare_exchange_weak(current, candidate, std::memory_order_relaxed)) {
    }
    return current;
}

int demo() {
    std::atomic<int> best{5};
    fetch_max(best, 3);
    fetch_max(best, 12);
    fetch_max(best, 8);
    return best.load();
}
