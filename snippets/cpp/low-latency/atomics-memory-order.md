---
lang: cpp
topic: low-latency
tier: 3
tags: [atomic, memory-order, acquire-release]
note: A release store paired with an acquire load is what makes the writes before the store visible after the load.
---
#include <atomic>
#include <thread>

int demo() {
    std::atomic<int> data{0};
    std::atomic<bool> ready{false};

    std::thread producer([&] {
        data.store(42, std::memory_order_relaxed);
        ready.store(true, std::memory_order_release);
    });

    int seen = 0;
    while (!ready.load(std::memory_order_acquire)) {
    }
    seen = data.load(std::memory_order_relaxed);

    producer.join();

    std::atomic<int> counter{0};
    counter.fetch_add(1, std::memory_order_relaxed);
    return seen + counter.load();
}
