---
lang: python
topic: dsa
tier: 4
tags: [dp, matrix-chain, interval]
note: Interval DP fills by increasing length, so every sub-interval is ready when needed.
---
def matrix_chain(dims):
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]
    split = [[0] * n for _ in range(n)]
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = min(
                (dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1], k)
                for k in range(i, j)
            )[0]
    return dp[0][n - 1]

print(matrix_chain([10, 30, 5, 60]), matrix_chain([40, 20, 30, 10, 30]))
