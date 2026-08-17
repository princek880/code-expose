---
lang: python
topic: dsa
tier: 4
tags: [segment-tree, range-query, iterative]
note: The iterative bottom-up form needs no recursion and no 4n padding.
---
class SegTree:
    def __init__(self, xs):
        self.n = len(xs)
        self.t = [0] * self.n + list(xs)
        for i in range(self.n - 1, 0, -1):
            self.t[i] = self.t[2 * i] + self.t[2 * i + 1]

    def update(self, i, val):
        i += self.n
        self.t[i] = val
        while i > 1:
            i //= 2
            self.t[i] = self.t[2 * i] + self.t[2 * i + 1]

    def query(self, lo, hi):
        res, lo, hi = 0, lo + self.n, hi + self.n
        while lo < hi:
            if lo & 1:
                res += self.t[lo]
                lo += 1
            if hi & 1:
                hi -= 1
                res += self.t[hi]
            lo //= 2
            hi //= 2
        return res

st = SegTree([1, 2, 3, 4, 5])
print(st.query(1, 4))
st.update(2, 10)
print(st.query(1, 4), st.query(0, 5))
