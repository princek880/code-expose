---
lang: python
topic: numerical
tier: 3
tags: [probability, reservoir, streaming]
note: Element i survives with probability k/i, which makes every element equally likely at the end.
---
import random

def reservoir(stream, k, rng):
    out = []
    for i, item in enumerate(stream, start=1):
        if i <= k:
            out.append(item)
        else:
            j = rng.randrange(i)
            if j < k:
                out[j] = item
    return out

rng = random.Random(0)
counts = [0] * 10
for _ in range(30000):
    for x in reservoir(range(10), 3, rng):
        counts[x] += 1
print([round(c / 30000, 2) for c in counts])
