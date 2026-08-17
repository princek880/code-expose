---
lang: python
topic: core-syntax
tier: 2
tags: [match, guard]
note: A guard runs only after the pattern matched, so it can use the captured names.
---
def classify(n):
    match n:
        case 0:
            return "zero"
        case x if x < 0:
            return "negative"
        case 1 | 2 | 3:
            return "small"
        case x if x % 2 == 0:
            return "even"
        case _:
            return "odd"

print([classify(n) for n in (-2, 0, 2, 3, 9)])
