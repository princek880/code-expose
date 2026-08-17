---
lang: python
topic: core-syntax
tier: 3
tags: [match, as-pattern]
note: An as-pattern captures the whole matched value while still destructuring it.
---
def summarize(event):
    match event:
        case {"kind": "click", "at": [x, y] as pos} if x > 0:
            return f"click{pos}"
        case {"kind": "key", "code": (int() | str()) as code}:
            return f"key:{code}"
        case [{"kind": k}, *_] as batch:
            return f"batch:{k}:{len(batch)}"
    return "?"

print(summarize({"kind": "click", "at": [3, 4]}), summarize({"kind": "key", "code": 27}))
