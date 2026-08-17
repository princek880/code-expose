---
lang: python
topic: dsa
tier: 3
tags: [greedy, scheduling, counting]
note: The most frequent task fixes the skeleton; ties fill the final partial row.
---
from collections import Counter

def least_interval(tasks, cooldown):
    counts = Counter(tasks)
    top = max(counts.values())
    ties = sum(1 for v in counts.values() if v == top)
    return max(len(tasks), (top - 1) * (cooldown + 1) + ties)

def reorganize(s):
    counts = Counter(s)
    if max(counts.values()) > (len(s) + 1) // 2:
        return ""
    out = [""] * len(s)
    i = 0
    for ch, n in counts.most_common():
        for _ in range(n):
            if i >= len(s):
                i = 1
            out[i] = ch
            i += 2
    return "".join(out)

print(least_interval(["A", "A", "A", "B", "B", "B"], 2), reorganize("aab"))
