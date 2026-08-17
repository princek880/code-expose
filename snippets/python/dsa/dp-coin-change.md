---
lang: python
topic: dsa
tier: 2
tags: [dp, coin-change]
note: Coins outside, amount inside counts combinations; swapping the loops counts permutations.
---
def fewest_coins(coins, amount):
    INF = amount + 1
    dp = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] <= amount else -1

def count_combinations(coins, amount):
    dp = [1] + [0] * amount
    for c in coins:
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]

print(fewest_coins([1, 5, 6, 9], 11), count_combinations([1, 2, 5], 5))
