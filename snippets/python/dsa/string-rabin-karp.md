---
lang: python
topic: dsa
tier: 3
tags: [string, rolling-hash, rabin-karp]
note: Always verify a hash hit against the real substring; equal hashes are not equal strings.
---
def rabin_karp(text, pattern, base=256, mod=(1 << 61) - 1):
    n, m = len(text), len(pattern)
    if m > n or not m:
        return []
    high = pow(base, m - 1, mod)
    hp = hs = 0
    for i in range(m):
        hp = (hp * base + ord(pattern[i])) % mod
        hs = (hs * base + ord(text[i])) % mod
    out = []
    for i in range(n - m + 1):
        if hs == hp and text[i:i + m] == pattern:
            out.append(i)
        if i + m < n:
            hs = ((hs - ord(text[i]) * high) * base + ord(text[i + m])) % mod
    return out

print(rabin_karp("abracadabra", "abra"))
