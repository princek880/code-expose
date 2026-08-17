---
lang: python
topic: core-syntax
tier: 2
tags: [decorator, functools]
note: Without wraps the wrapper steals __name__, __doc__ and the signature metadata.
---
from functools import wraps

def once(fn):
    @wraps(fn)
    def inner(*args, **kwargs):
        if not inner.done:
            inner.value = fn(*args, **kwargs)
            inner.done = True
        return inner.value
    inner.done = False
    return inner

@once
def setup():
    """Build the thing exactly once."""
    return {"ready": True}

print(setup.__name__, setup.__doc__[:5], setup() is setup())
