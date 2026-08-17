---
lang: python
topic: core-syntax
tier: 1
tags: [builtins, enumerate, zip]
note: zip stops at the shortest input unless you pass strict=True and let it raise.
---
names, scores = ["a", "b", "c"], [90, 80]
for i, (n, s) in enumerate(zip(names, scores), start=1):
    print(f"{i}. {n}={s}")

print(list(zip(*[(1, "a"), (2, "b")])))
print(dict(zip(names, scores)))
print([f"{i}:{c}" for i, c in enumerate("xyz")])
