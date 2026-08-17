---
lang: python
topic: core-syntax
tier: 3
tags: [decorator, factory]
note: A decorator that takes arguments needs a third layer: args, function, call.
---
def retry(times=3, on=(ValueError,)):
    def deco(fn):
        def inner(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return fn(*args, **kwargs)
                except on:
                    if attempt == times:
                        raise
        return inner
    return deco

@retry(times=2, on=(ValueError, KeyError))
def flaky(d):
    return d["k"]
