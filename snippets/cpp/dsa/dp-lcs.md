---
lang: cpp
topic: dsa
tier: 3
tags: [dp, lcs, 2d]
note: The 2D table indexes a[i-1] and b[j-1] because row and column 0 represent the empty prefix.
---
#include <algorithm>
#include <string>
#include <vector>

int lcs_len(const std::string& a, const std::string& b) {
    std::vector<std::vector<int>> dp(a.size() + 1, std::vector<int>(b.size() + 1, 0));
    for (std::size_t i = 1; i <= a.size(); ++i) {
        for (std::size_t j = 1; j <= b.size(); ++j) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[a.size()][b.size()];
}

int demo() { return lcs_len("AGGTAB", "GXTXAYB"); }
