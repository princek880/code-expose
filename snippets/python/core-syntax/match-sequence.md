---
lang: python
topic: core-syntax
tier: 3
tags: [match, sequence]
note: A sequence pattern matches length and shape; *rest absorbs the middle.
---
def route(parts):
    match parts:
        case []:
            return "root"
        case ["users", uid]:
            return f"user:{uid}"
        case ["users", uid, *rest] if rest:
            return f"user:{uid}/{'/'.join(rest)}"
        case [first, *_]:
            return f"top:{first}"

print(route([]), route(["users", "7"]), route(["users", "7", "posts"]))
