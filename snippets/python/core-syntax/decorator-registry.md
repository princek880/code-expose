---
lang: python
topic: core-syntax
tier: 3
tags: [decorator, registry]
note: Returning the function unchanged makes a decorator a pure registration hook.
---
HANDLERS = {}

def handles(*kinds):
    def deco(fn):
        for k in kinds:
            HANDLERS[k] = fn
        return fn
    return deco

@handles("click", "tap")
def on_click(ev):
    return ("click", ev.get("x", 0), ev.get("y", 0))

print(sorted(HANDLERS), HANDLERS["tap"]({"x": 1}))
