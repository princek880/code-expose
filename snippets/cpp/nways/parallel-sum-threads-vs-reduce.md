---
lang: cpp
topic: nways
tier: 3
tags: [nways, parallel-sum, threading]
note: Hand-split threads need a manual join and combine step that std::reduce(par) does for you internally.
---
#include <execution>
#include <numeric>
#include <thread>
#include <vector>

long long manual_parallel_sum(const std::vector<int>& xs, int workers) {
    std::vector<long long> partial(static_cast<std::size_t>(workers), 0);
    std::vector<std::thread> threads;
    std::size_t chunk = xs.size() / static_cast<std::size_t>(workers);

    for (int w = 0; w < workers; ++w) {
        threads.emplace_back([&, w] {
            std::size_t start = static_cast<std::size_t>(w) * chunk;
            std::size_t end = (w == workers - 1) ? xs.size() : start + chunk;
            long long sum = 0;
            for (std::size_t i = start; i < end; ++i) sum += xs[i];
            partial[static_cast<std::size_t>(w)] = sum;
        });
    }
    for (auto& t : threads) t.join();

    long long total = 0;
    for (long long p : partial) total += p;
    return total;
}

int demo() {
    std::vector<int> xs(1000, 1);
    long long manual = manual_parallel_sum(xs, 4);
    long long via_reduce = std::reduce(std::execution::par, xs.begin(), xs.end(), 0LL);
    return static_cast<int>(manual == via_reduce) + static_cast<int>(manual % 1000);
}
