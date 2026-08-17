---
lang: python
topic: core-syntax
tier: 2
tags: [generator, yield]
note: A function with yield returns a generator; no body runs until the first next().
---
def windows(xs, n):
    buf = []
    for x in xs:
        buf.append(x)
        if len(buf) == n:
            yield tuple(buf)
            buf.pop(0)

print(list(windows(range(6), 3)))
print(sum(max(w) for w in windows([4, 1, 9, 2, 8], 2)))
