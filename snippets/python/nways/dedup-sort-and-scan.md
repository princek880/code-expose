---
lang: python
topic: nways
tier: 2
tags: [nways, deduplicate, sort]
note: Sorting first turns duplicate detection into an adjacent-pair check, no hashing required at all.
---
def dedup_sorted(xs):
    xs = sorted(xs)
    out = xs[:1]
    for x in xs[1:]:
        if x != out[-1]:
            out.append(x)
    return out

print(dedup_sorted([5, 1, 5, 3, 1, 2]))
