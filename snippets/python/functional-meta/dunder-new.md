---
lang: python
topic: functional-meta
tier: 4
tags: [metaclass, new, immutable]
note: __new__ builds the instance and runs before __init__, which is how you subclass immutables.
---
class Singleton:
    _instance = None

    def __new__(cls, *args):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

class Positive(int):
    def __new__(cls, value):
        if value <= 0:
            raise ValueError("must be positive")
        return super().__new__(cls, value)

print(Singleton() is Singleton(), Positive(5) + 1, type(Positive(5)).__name__)
