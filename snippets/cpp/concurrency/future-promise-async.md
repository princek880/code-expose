---
lang: cpp
topic: concurrency
tier: 2
tags: [future, promise, async, packaged-task]
note: std::async may run the task on another thread or lazily on get(); std::launch::async forces the former.
---
#include <future>
#include <thread>

int demo() {
    std::promise<int> prom;
    std::future<int> fut = prom.get_future();
    std::thread producer([&] { prom.set_value(42); });
    int from_promise = fut.get();
    producer.join();

    auto fut2 = std::async(std::launch::async, [] { return 10 + 5; });
    int from_async = fut2.get();

    std::packaged_task<int(int)> task([](int x) { return x * x; });
    std::future<int> fut3 = task.get_future();
    std::thread runner(std::move(task), 6);
    int from_task = fut3.get();
    runner.join();

    return from_promise + from_async + from_task;
}
