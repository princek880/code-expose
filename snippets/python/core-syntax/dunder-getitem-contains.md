---
lang: python
topic: core-syntax
tier: 3
tags: [dunder, sequence]
note: __getitem__ alone already makes a type iterable, via the legacy integer protocol.
---
class Ring:
    def __init__(self, items):
        self.items = list(items)

    def __getitem__(self, i):
        if isinstance(i, slice):
            return [self[k] for k in range(*i.indices(len(self.items)))]
        return self.items[i % len(self.items)]

    def __contains__(self, x):
        return x in self.items

    def __len__(self):
        return len(self.items)

r = Ring("abc")
print(r[4], r[-1], r[0:5], "b" in r)
