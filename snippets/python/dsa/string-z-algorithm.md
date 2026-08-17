---
lang: python
topic: dsa
tier: 4
tags: [string, z-algorithm, prefix]
note: z[i] is the match length at i against the whole string, reused from the rightmost box.
---
def z_function(s):
    n = len(s)
    z = [0] * n
    left = right = 0
    for i in range(1, n):
        if i < right:
            z[i] = min(right - i, z[i - left])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > right:
            left, right = i, i + z[i]
    return z

def find_all(text, pattern):
    z = z_function(pattern + "\x00" + text)
    m = len(pattern)
    return [i - m - 1 for i, v in enumerate(z) if v == m]

print(z_function("aabxaabxcaabxaabxay")[:8], find_all("ababcabab", "abab"))
