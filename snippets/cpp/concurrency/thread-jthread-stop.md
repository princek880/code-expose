---
lang: cpp
topic: concurrency
tier: 3
tags: [jthread, stop-token, cooperative-cancellation]
note: jthread joins automatically on destruction and carries a stop_token no plain thread has.
---
#include <atomic>
#include <thread>

int demo() {
    std::atomic<int> ticks{0};
    {
        std::jthread worker([&](std::stop_token tok) {
            while (!tok.stop_requested()) {
                ticks.fetch_add(1, std::memory_order_relaxed);
            }
        });
        while (ticks.load() < 1000) {
        }
    }
    return static_cast<int>(ticks.load() >= 1000);
}
