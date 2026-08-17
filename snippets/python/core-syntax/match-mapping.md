---
lang: python
topic: core-syntax
tier: 3
tags: [match, mapping]
note: Mapping patterns ignore extra keys, so **rest is how you catch the leftovers.
---
def handle(msg):
    match msg:
        case {"type": "ping"}:
            return "pong"
        case {"type": "add", "args": [a, b]}:
            return a + b
        case {"type": t, **rest} if rest:
            return f"{t}+{len(rest)}"
        case _:
            return None

print(handle({"type": "ping", "id": 1}), handle({"type": "add", "args": [2, 3]}))
