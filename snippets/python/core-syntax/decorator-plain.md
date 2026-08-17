---
lang: python
topic: core-syntax
tier: 2
tags: [decorator, closure]
note: A decorator is just a function that takes a function and returns a replacement.
---
def logged(fn):
    def inner(*args, **kwargs):
        print(f"-> {fn.__name__}{args}")
        result = fn(*args, **kwargs)
        print(f"<- {result!r}")
        return result
    return inner

@logged
def add(a, b):
    return a + b

add(2, 3)
