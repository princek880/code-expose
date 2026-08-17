---
lang: cpp
topic: concurrency
tier: 3
tags: [condition-variable, predicate, spurious-wakeup]
note: wait with a predicate loops internally, which is what protects against spurious wakeups.
---
#include <condition_variable>
#include <mutex>
#include <queue>
#include <thread>

int demo() {
    std::mutex m;
    std::condition_variable cv;
    std::queue<int> q;
    bool done = false;

    std::thread producer([&] {
        for (int i = 0; i < 5; ++i) {
            {
                std::lock_guard<std::mutex> lock(m);
                q.push(i);
            }
            cv.notify_one();
        }
        {
            std::lock_guard<std::mutex> lock(m);
            done = true;
        }
        cv.notify_one();
    });

    int total = 0;
    std::unique_lock<std::mutex> lock(m);
    while (!done || !q.empty()) {
        cv.wait(lock, [&] { return !q.empty() || done; });
        while (!q.empty()) {
            total += q.front();
            q.pop();
        }
    }
    lock.unlock();
    producer.join();
    return total;
}
