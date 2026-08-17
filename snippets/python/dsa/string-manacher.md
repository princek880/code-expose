---
lang: python
topic: dsa
tier: 4
tags: [string, manacher, palindrome]
note: Interleaving a separator makes every palindrome odd-length, which halves the case analysis.
---
def longest_palindrome(s):
    if not s:
        return ""
    t = "#" + "#".join(s) + "#"
    n = len(t)
    radius = [0] * n
    center = right = 0
    for i in range(n):
        if i < right:
            radius[i] = min(right - i, radius[2 * center - i])
        while (i - radius[i] - 1 >= 0 and i + radius[i] + 1 < n
               and t[i - radius[i] - 1] == t[i + radius[i] + 1]):
            radius[i] += 1
        if i + radius[i] > right:
            center, right = i, i + radius[i]
    best = max(range(n), key=lambda i: radius[i])
    return t[best - radius[best]:best + radius[best] + 1].replace("#", "")

print(longest_palindrome("babad"), longest_palindrome("cbbd"), longest_palindrome("a"))
