---
lang: python
topic: dsa
tier: 3
tags: [heap, median, streaming]
note: Push through the other heap first; that single bounce keeps both halves correct.
---
import heapq

class MedianStream:
    def __init__(self):
        self.low, self.high = [], []

    def add(self, x):
        heapq.heappush(self.low, -x)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def median(self):
        if len(self.low) > len(self.high):
            return float(-self.low[0])
        return (-self.low[0] + self.high[0]) / 2

m = MedianStream()
for x in (5, 15, 1, 3):
    m.add(x)
    print(m.median(), end=" ")
