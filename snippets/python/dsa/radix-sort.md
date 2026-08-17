---
lang: python
topic: dsa
tier: 3
tags: [radix-sort, lsd]
note: LSD radix works only because each digit pass is itself stable.
---
def radix_sort(xs, base=10):
    out, exp = list(xs), 1
    while max(out, default=0) // exp:
        buckets = [[] for _ in range(base)]
        for x in out:
            buckets[(x // exp) % base].append(x)
        out = [x for bucket in buckets for x in bucket]
        exp *= base
    return out

print(radix_sort([170, 45, 75, 90, 2, 802, 24, 66]))
print(radix_sort([5, 3, 1], base=2))
