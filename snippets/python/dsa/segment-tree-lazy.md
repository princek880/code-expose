---
lang: python
topic: dsa
tier: 4
tags: [segment-tree, lazy-propagation, range-update]
note: Push down before descending and pull up after; skip either and the sums go stale.
---
class LazySeg:
    def __init__(self, n):
        self.n = n
        self.sum = [0] * (4 * n)
        self.lazy = [0] * (4 * n)

    def _push(self, node, lo, hi):
        if self.lazy[node]:
            self.sum[node] += self.lazy[node] * (hi - lo + 1)
            if lo != hi:
                self.lazy[2 * node] += self.lazy[node]
                self.lazy[2 * node + 1] += self.lazy[node]
            self.lazy[node] = 0

    def add(self, l, r, val, node=1, lo=0, hi=None):
        hi = self.n - 1 if hi is None else hi
        self._push(node, lo, hi)
        if r < lo or hi < l:
            return
        if l <= lo and hi <= r:
            self.lazy[node] += val
            self._push(node, lo, hi)
            return
        mid = (lo + hi) // 2
        self.add(l, r, val, 2 * node, lo, mid)
        self.add(l, r, val, 2 * node + 1, mid + 1, hi)
        self.sum[node] = self.sum[2 * node] + self.sum[2 * node + 1]

    def query(self, l, r, node=1, lo=0, hi=None):
        hi = self.n - 1 if hi is None else hi
        self._push(node, lo, hi)
        if r < lo or hi < l:
            return 0
        if l <= lo and hi <= r:
            return self.sum[node]
        mid = (lo + hi) // 2
        return self.query(l, r, 2 * node, lo, mid) + self.query(l, r, 2 * node + 1, mid + 1, hi)

t = LazySeg(8)
t.add(0, 3, 5)
t.add(2, 6, 2)
print(t.query(0, 7), t.query(2, 3), t.query(4, 6))
