---
lang: cpp
topic: dsa
tier: 3
tags: [dp, knapsack, 0-1]
note: Same downward-capacity trick as the Python version prevents an item being reused within one round.
---
#include <algorithm>
#include <vector>

int knapsack(const std::vector<int>& w, const std::vector<int>& v, int cap) {
    std::vector<int> dp(static_cast<std::size_t>(cap) + 1, 0);
    for (std::size_t i = 0; i < w.size(); ++i) {
        for (int c = cap; c >= w[i]; --c) {
            dp[static_cast<std::size_t>(c)] = std::max(dp[static_cast<std::size_t>(c)],
                dp[static_cast<std::size_t>(c - w[i])] + v[i]);
        }
    }
    return dp[static_cast<std::size_t>(cap)];
}

int demo() {
    return knapsack({1, 3, 4, 5}, {1, 4, 5, 7}, 7);
}
