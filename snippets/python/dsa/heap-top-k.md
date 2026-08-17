---
lang: python
topic: dsa
tier: 2
tags: [heap, top-k]
note: Keep a heap of size k and evict the smallest; that is O(n log k), not O(n log n).
---
import heapq
from collections import Counter

def top_k(xs, k):
    heap = []
    for x in xs:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return sorted(heap, reverse=True)

def k_most_frequent(words, k):
    counts = Counter(words)
    return heapq.nlargest(k, counts, key=counts.get)

print(top_k([3, 1, 9, 7, 2, 8], 3))
print(k_most_frequent(["a", "b", "a", "c", "b", "a"], 2))
