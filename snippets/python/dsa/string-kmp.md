---
lang: python
topic: dsa
tier: 4
tags: [string, kmp, prefix-function]
note: lps[i] is the longest proper prefix that is also a suffix, and it is never re-scanned.
---
def build_lps(pattern):
    lps, k = [0] * len(pattern), 0
    for i in range(1, len(pattern)):
        while k and pattern[i] != pattern[k]:
            k = lps[k - 1]
        if pattern[i] == pattern[k]:
            k += 1
            lps[i] = k
    return lps

def kmp(text, pattern):
    if not pattern:
        return []
    lps, out, k = build_lps(pattern), [], 0
    for i, ch in enumerate(text):
        while k and ch != pattern[k]:
            k = lps[k - 1]
        if ch == pattern[k]:
            k += 1
            if k == len(pattern):
                out.append(i - k + 1)
                k = lps[k - 1]
    return out

print(build_lps("ababaca"), kmp("ababcabcabababd", "ababd"))
