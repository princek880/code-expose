---
lang: python
topic: core-syntax
tier: 3
tags: [decorator, order]
note: Stacked decorators apply bottom-up, so the closest one wraps the function first.
---
def bold(fn):
    return lambda *a: f"<b>{fn(*a)}</b>"

def italic(fn):
    return lambda *a: f"<i>{fn(*a)}</i>"

@bold
@italic
def shout(s):
    return s.upper()

print(shout("hi"))
