---
lang: python
topic: core-syntax
tier: 4
tags: [exceptions, except-star]
note: except* matches by type inside an ExceptionGroup and can run more than one branch.
---
def fan_out():
    raise ExceptionGroup("partial", [ValueError("v"), KeyError("k")])

try:
    fan_out()
except* ValueError as eg:
    print("values:", len(eg.exceptions))
except* KeyError as eg:
    print("keys:", len(eg.exceptions))
