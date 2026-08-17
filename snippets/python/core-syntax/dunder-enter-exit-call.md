---
lang: python
topic: core-syntax
tier: 3
tags: [dunder, context-manager]
note: Returning True from __exit__ swallows the exception; returning None re-raises it.
---
class Tally:
    def __init__(self):
        self.n = 0

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        self.closed = True
        return exc_type is ZeroDivisionError

    def __call__(self, k=1):
        self.n += k
        return self.n

with Tally() as t:
    t(); t(5)
    1 / 0
print(t.n, t.closed)
