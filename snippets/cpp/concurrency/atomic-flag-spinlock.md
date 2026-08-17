---
lang: cpp
topic: concurrency
tier: 3
tags: [atomic-flag, spinlock, test-and-set]
note: atomic_flag is the one lock-free type the standard guarantees; a spinlock is its textbook use.
---
#include <atomic>
#include <thread>
#include <vector>

class SpinLock {
public:
    void lock() {
        while (flag_.test_and_set(std::memory_order_acquire)) {
        }
    }
    void unlock() { flag_.clear(std::memory_order_release); }

private:
    std::atomic_flag flag_ = ATOMIC_FLAG_INIT;
};

int demo() {
    SpinLock lock;
    int total = 0;
    std::vector<std::thread> threads;
    for (int i = 0; i < 8; ++i) {
        threads.emplace_back([&] {
            for (int k = 0; k < 1000; ++k) {
                lock.lock();
                ++total;
                lock.unlock();
            }
        });
    }
    for (auto& t : threads) t.join();
    return total;
}
