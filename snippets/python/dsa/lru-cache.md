---
lang: python
topic: dsa
tier: 3
tags: [lru, cache, ordered-dict]
note: A dict preserves insertion order, so pop-and-reinsert is the whole recency mechanism.
---
class LRU:
    def __init__(self, capacity):
        self.capacity = capacity
        self.data = {}

    def get(self, key):
        if key not in self.data:
            return -1
        self.data[key] = self.data.pop(key)
        return self.data[key]

    def put(self, key, value):
        if key in self.data:
            self.data.pop(key)
        elif len(self.data) >= self.capacity:
            self.data.pop(next(iter(self.data)))
        self.data[key] = value

c = LRU(2)
c.put(1, 1); c.put(2, 2)
print(c.get(1))
c.put(3, 3)
print(c.get(2), list(c.data))
