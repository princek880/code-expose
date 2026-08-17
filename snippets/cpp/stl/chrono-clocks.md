---
lang: cpp
topic: stl
tier: 3
tags: [chrono, steady-clock, time-point]
note: Use steady_clock for elapsed time; system_clock can jump backwards when the wall clock is adjusted.
---
#include <chrono>
#include <thread>

long long demo() {
    using namespace std::chrono;

    auto start = steady_clock::now();
    std::this_thread::sleep_for(1ms);
    auto elapsed = steady_clock::now() - start;

    auto ms = duration_cast<milliseconds>(elapsed).count();
    auto deadline = steady_clock::now() + 50ms;
    bool before = steady_clock::now() < deadline;

    auto wall = system_clock::now();
    auto epoch_secs = duration_cast<seconds>(wall.time_since_epoch()).count();
    return ms + static_cast<long long>(before) + (epoch_secs > 0);
}
