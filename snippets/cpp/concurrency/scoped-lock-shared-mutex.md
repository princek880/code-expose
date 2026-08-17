---
lang: cpp
topic: concurrency
tier: 3
tags: [scoped-lock, shared-mutex, reader-writer]
note: scoped_lock takes several mutexes at once and locks them in a deadlock-avoiding order.
---
#include <mutex>
#include <shared_mutex>
#include <thread>
#include <vector>

int demo() {
    std::mutex a, b;
    std::scoped_lock lock(a, b);

    std::shared_mutex rw;
    int data = 0;

    auto writer = [&] {
        std::unique_lock<std::shared_mutex> wl(rw);
        data += 1;
    };
    auto reader = [&] {
        std::shared_lock<std::shared_mutex> rl(rw);
        return data;
    };

    std::vector<std::thread> writers;
    for (int i = 0; i < 5; ++i) writers.emplace_back(writer);
    for (auto& t : writers) t.join();

    return reader();
}
