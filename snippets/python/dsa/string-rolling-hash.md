---
lang: python
topic: dsa
tier: 3
tags: [string, rolling-hash, prefix]
note: Prefix hashes give any substring's hash in O(1), which is what makes comparisons cheap.
---
class RollingHash:
    def __init__(self, s, base=131, mod=(1 << 61) - 1):
        self.mod = mod
        self.h = [0] * (len(s) + 1)
        self.pw = [1] * (len(s) + 1)
        for i, ch in enumerate(s):
            self.h[i + 1] = (self.h[i] * base + ord(ch)) % mod
            self.pw[i + 1] = self.pw[i] * base % mod

    def get(self, i, j):
        return (self.h[j] - self.h[i] * self.pw[j - i]) % self.mod

s = "abcabcabc"
rh = RollingHash(s)
print(rh.get(0, 3) == rh.get(3, 6), rh.get(0, 3) == rh.get(1, 4))
