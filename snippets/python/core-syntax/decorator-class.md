---
lang: python
topic: core-syntax
tier: 3
tags: [decorator, class, call]
note: A class decorator holds state on self, so no closure cell juggling.
---
class Counted:
    def __init__(self, fn):
        self.fn = fn
        self.calls = 0

    def __call__(self, *args, **kwargs):
        self.calls += 1
        return self.fn(*args, **kwargs)

@Counted
def ping(x):
    return x * 2

ping(1); ping(2); ping(3)
print(ping.calls)
