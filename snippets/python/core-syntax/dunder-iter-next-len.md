---
lang: python
topic: core-syntax
tier: 2
tags: [dunder, iterator]
note: __iter__ returning self makes the object its own iterator, so it exhausts once.
---
class Countdown:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return self

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

    def __len__(self):
        return max(self.n, 0)

c = Countdown(4)
print(len(c), list(c), list(c))
