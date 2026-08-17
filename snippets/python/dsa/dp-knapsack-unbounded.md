---
lang: python
topic: dsa
tier: 3
tags: [dp, knapsack, unbounded]
note: Forward capacity iteration is exactly what allows an item to be taken again.
---
def unbounded(weights, values, cap):
    dp = [0] * (cap + 1)
    for c in range(1, cap + 1):
        for w, v in zip(weights, values):
            if w <= c:
                dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]

def rod_cutting(prices):
    n = len(prices)
    dp = [0] * (n + 1)
    for length in range(1, n + 1):
        dp[length] = max(prices[k - 1] + dp[length - k] for k in range(1, length + 1))
    return dp[n]

print(unbounded([2, 3, 4], [3, 4, 5], 8), rod_cutting([1, 5, 8, 9, 10]))
