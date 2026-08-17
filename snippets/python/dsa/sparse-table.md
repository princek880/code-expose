---
lang: python
topic: dsa
tier: 4
tags: [sparse-table, rmq, immutable]
note: Overlapping halves are fine for min and max because they are idempotent; sums are not.
---
class SparseTable:
    def __init__(self, xs):
        n = len(xs)
        k = n.bit_length()
        self.t = [list(xs)] + [[0] * n for _ in range(k)]
        for j in range(1, k + 1):
            span = 1 << j
            for i in range(n - span + 1):
                self.t[j][i] = min(self.t[j - 1][i], self.t[j - 1][i + (span >> 1)])

    def query(self, lo, hi):
        j = (hi - lo + 1).bit_length() - 1
        return min(self.t[j][lo], self.t[j][hi - (1 << j) + 1])

st = SparseTable([5, 2, 9, 1, 7, 3, 8, 4])
print(st.query(0, 7), st.query(4, 6), st.query(2, 2))
