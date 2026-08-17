---
lang: cpp
topic: concurrency
tier: 4
tags: [latch, barrier, synchronization]
note: A latch counts down once and cannot reset; a barrier resets automatically for the next phase.
---
#include <atomic>
#include <barrier>
#include <latch>
#include <thread>
#include <vector>

int demo() {
    std::latch start_gate(1);
    std::atomic<int> ready_count{0};
    std::vector<std::thread> workers;
    for (int i = 0; i < 4; ++i) {
        workers.emplace_back([&] {
            ready_count.fetch_add(1);
            start_gate.wait();
        });
    }
    while (ready_count.load() < 4) {
    }
    start_gate.count_down();
    for (auto& t : workers) t.join();

    std::atomic<int> phase{0};
    std::barrier sync_point(3, [&] { phase.fetch_add(1); });
    std::vector<std::thread> phased;
    for (int i = 0; i < 3; ++i) {
        phased.emplace_back([&] {
            sync_point.arrive_and_wait();
            sync_point.arrive_and_wait();
        });
    }
    for (auto& t : phased) t.join();

    return ready_count.load() + phase.load();
}
