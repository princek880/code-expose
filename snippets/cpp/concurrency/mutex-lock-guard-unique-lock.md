---
lang: cpp
topic: concurrency
tier: 2
tags: [mutex, lock-guard, unique-lock]
note: lock_guard cannot unlock early; unique_lock can, which is why condition_variable needs the latter.
---
#include <mutex>
#include <thread>
#include <vector>

int demo() {
    std::mutex m;
    int total = 0;

    auto bump = [&] {
        std::lock_guard<std::mutex> guard(m);
        total += 1;
    };

    std::vector<std::thread> threads;
    for (int i = 0; i < 8; ++i) threads.emplace_back(bump);
    for (auto& t : threads) t.join();

    std::unique_lock<std::mutex> lock(m);
    total += 10;
    lock.unlock();
    total += 1;
    lock.lock();
    total += 1;

    return total;
}
