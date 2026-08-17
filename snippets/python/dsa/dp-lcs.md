---
lang: python
topic: dsa
tier: 3
tags: [dp, lcs, 2d]
note: The +1 diagonal step is the match case; everything else is the max of two neighbours.
---
def lcs_len(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp, dp[-1][-1]

def lcs_string(a, b):
    dp, _ = lcs_len(a, b)
    i, j, out = len(a), len(b), []
    while i and j:
        if a[i - 1] == b[j - 1]:
            out.append(a[i - 1])
            i, j = i - 1, j - 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    return "".join(reversed(out))

print(lcs_len("AGGTAB", "GXTXAYB")[1], lcs_string("AGGTAB", "GXTXAYB"))
