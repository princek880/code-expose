---
lang: python
topic: dsa
tier: 2
tags: [dp, lis]
note: dp[i] is the best run ending exactly at i, which is why the answer is a max over all i.
---
def lis(xs):
    if not xs:
        return 0, []
    dp = [1] * len(xs)
    prev = [-1] * len(xs)
    for i in range(len(xs)):
        for j in range(i):
            if xs[j] < xs[i] and dp[j] + 1 > dp[i]:
                dp[i], prev[i] = dp[j] + 1, j
    best = max(range(len(xs)), key=lambda i: dp[i])
    seq, k = [], best
    while k != -1:
        seq.append(xs[k])
        k = prev[k]
    return dp[best], seq[::-1]

print(lis([10, 9, 2, 5, 3, 7, 101, 18]))
