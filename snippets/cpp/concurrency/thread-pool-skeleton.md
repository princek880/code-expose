---
lang: cpp
topic: concurrency
tier: 3
tags: [thread-pool, work-queue, condition-variable]
note: Workers block on an empty queue via condition_variable instead of spinning, so idle costs nothing.
---
#include <condition_variable>
#include <functional>
#include <future>
#include <mutex>
#include <queue>
#include <thread>
#include <vector>

class ThreadPool {
public:
    explicit ThreadPool(int n) {
        for (int i = 0; i < n; ++i) {
            workers_.emplace_back([this] { worker_loop(); });
        }
    }

    ~ThreadPool() {
        {
            std::lock_guard<std::mutex> lock(m_);
            stop_ = true;
        }
        cv_.notify_all();
        for (auto& t : workers_) t.join();
    }

    std::future<int> submit(std::function<int()> job) {
        auto task = std::make_shared<std::packaged_task<int()>>(std::move(job));
        std::future<int> fut = task->get_future();
        {
            std::lock_guard<std::mutex> lock(m_);
            queue_.push([task] { (*task)(); });
        }
        cv_.notify_one();
        return fut;
    }

private:
    void worker_loop() {
        while (true) {
            std::function<void()> job;
            {
                std::unique_lock<std::mutex> lock(m_);
                cv_.wait(lock, [this] { return stop_ || !queue_.empty(); });
                if (stop_ && queue_.empty()) return;
                job = std::move(queue_.front());
                queue_.pop();
            }
            job();
        }
    }

    std::vector<std::thread> workers_;
    std::queue<std::function<void()>> queue_;
    std::mutex m_;
    std::condition_variable cv_;
    bool stop_{false};
};

int demo() {
    ThreadPool pool(4);
    auto a = pool.submit([] { return 2 + 2; });
    auto b = pool.submit([] { return 3 * 3; });
    return a.get() + b.get();
}
