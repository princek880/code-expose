---
lang: python
topic: dsa
tier: 3
tags: [fenwick, bit, prefix-sum]
note: i & -i isolates the lowest set bit, which is the span of the node at index i.
---
class BIT:
    def __init__(self, n):
        self.n = n
        self.t = [0] * (n + 1)

    def add(self, i, delta):
        i += 1
        while i <= self.n:
            self.t[i] += delta
            i += i & -i

    def prefix(self, i):
        total, i = 0, i + 1
        while i > 0:
            total += self.t[i]
            i -= i & -i
        return total

    def range_sum(self, lo, hi):
        return self.prefix(hi) - (self.prefix(lo - 1) if lo else 0)

b = BIT(8)
for i, v in enumerate([1, 2, 3, 4, 5, 6, 7, 8]):
    b.add(i, v)
print(b.prefix(3), b.range_sum(2, 5))
