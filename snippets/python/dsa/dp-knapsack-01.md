---
lang: python
topic: dsa
tier: 3
tags: [dp, knapsack, 0-1]
note: Iterate the capacity downward, or an item gets reused inside the same round.
---
def knapsack(weights, values, cap):
    dp = [0] * (cap + 1)
    for w, v in zip(weights, values):
        for c in range(cap, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]

def knapsack_items(weights, values, cap):
    n = len(weights)
    dp = [[0] * (cap + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for c in range(cap + 1):
            dp[i][c] = dp[i - 1][c]
            if weights[i - 1] <= c:
                dp[i][c] = max(dp[i][c], dp[i - 1][c - weights[i - 1]] + values[i - 1])
    picked, c = [], cap
    for i in range(n, 0, -1):
        if dp[i][c] != dp[i - 1][c]:
            picked.append(i - 1)
            c -= weights[i - 1]
    return dp[n][cap], picked[::-1]

print(knapsack([1, 3, 4, 5], [1, 4, 5, 7], 7), knapsack_items([1, 3, 4, 5], [1, 4, 5, 7], 7))
