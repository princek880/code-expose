---
lang: python
topic: dsa
tier: 4
tags: [heap, lazy-deletion]
note: You cannot remove from the middle of a heap, so mark it dead and skip it at the top.
---
import heapq
from collections import Counter

class LazyHeap:
    def __init__(self):
        self.heap, self.dead, self.size = [], Counter(), 0

    def push(self, x):
        heapq.heappush(self.heap, x)
        self.size += 1

    def remove(self, x):
        self.dead[x] += 1
        self.size -= 1

    def top(self):
        while self.heap and self.dead[self.heap[0]]:
            self.dead[self.heap[0]] -= 1
            heapq.heappop(self.heap)
        return self.heap[0] if self.heap else None

h = LazyHeap()
for x in (5, 1, 3):
    h.push(x)
h.remove(1)
print(h.top(), h.size)
