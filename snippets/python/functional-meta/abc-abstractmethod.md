---
lang: python
topic: functional-meta
tier: 3
tags: [abc, abstractmethod, interface]
note: An ABC with an abstract method cannot be instantiated, which turns a contract into a hard error.
---
from abc import ABC, abstractmethod

class Store(ABC):
    @abstractmethod
    def get(self, key): ...

    @abstractmethod
    def put(self, key, value): ...

    def get_or(self, key, default=None):
        try:
            return self.get(key)
        except KeyError:
            return default

class MemoryStore(Store):
    def __init__(self):
        self.data = {}

    def get(self, key):
        return self.data[key]

    def put(self, key, value):
        self.data[key] = value

s = MemoryStore()
s.put("a", 1)
print(s.get("a"), s.get_or("b", "missing"))
try:
    Store()
except TypeError as e:
    print(type(e).__name__)
