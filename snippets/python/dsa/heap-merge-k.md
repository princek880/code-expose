---
lang: python
topic: dsa
tier: 3
tags: [heap, merge]
note: The heap holds one entry per list, so memory is O(k) no matter how long the lists are.
---
import heapq

def merge_k(lists):
    heap = [(lst[0], i, 0) for i, lst in enumerate(lists) if lst]
    heapq.heapify(heap)
    out = []
    while heap:
        val, li, ci = heapq.heappop(heap)
        out.append(val)
        if ci + 1 < len(lists[li]):
            heapq.heappush(heap, (lists[li][ci + 1], li, ci + 1))
    return out

print(merge_k([[1, 4, 7], [2, 5], [3, 6, 8, 9]]))
print(list(heapq.merge([1, 4], [2, 3], [0])))
