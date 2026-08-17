---
lang: cpp
topic: dsa
tier: 2
tags: [dp, coin-change]
note: The same fewest-coins recurrence as Python, with an explicit sentinel instead of a Python float infinity.
---
#include <algorithm>
#include <climits>
#include <vector>

int fewest_coins(const std::vector<int>& coins, int amount) {
    const int INF = amount + 1;
    std::vector<int> dp(static_cast<std::size_t>(amount) + 1, INF);
    dp[0] = 0;
    for (int a = 1; a <= amount; ++a) {
        for (int c : coins) {
            if (c <= a) dp[static_cast<std::size_t>(a)] = std::min(dp[static_cast<std::size_t>(a)],
                dp[static_cast<std::size_t>(a - c)] + 1);
        }
    }
    return dp[static_cast<std::size_t>(amount)] <= amount ? dp[static_cast<std::size_t>(amount)] : -1;
}

int demo() { return fewest_coins({1, 5, 6, 9}, 11); }
