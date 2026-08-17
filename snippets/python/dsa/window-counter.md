---
lang: python
topic: dsa
tier: 3
tags: [sliding-window, counter]
note: Track how many characters are already satisfied, so the check stays O(1) per step.
---
from collections import Counter

def find_anagrams(s, pattern):
    need, window = Counter(pattern), Counter()
    k, out = len(pattern), []
    for i, ch in enumerate(s):
        window[ch] += 1
        if i >= k:
            drop = s[i - k]
            window[drop] -= 1
            if window[drop] == 0:
                del window[drop]
        if window == need:
            out.append(i - k + 1)
    return out

print(find_anagrams("cbaebabacd", "abc"))
