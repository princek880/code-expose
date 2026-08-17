---
lang: python
topic: dsa
tier: 2
tags: [heapq, priority-queue]
note: heapq is a min-heap only; negate the key to get max-heap behaviour.
---
import heapq

xs = [5, 1, 8, 3, 9, 2]
heapq.heapify(xs)
heapq.heappush(xs, 0)
print(heapq.heappop(xs), xs[0])
print(heapq.heappushpop(xs, 4), heapq.heapreplace(xs, 7))
print(heapq.nsmallest(3, xs), heapq.nlargest(2, xs))

tasks = [(2, "b"), (1, "a"), (3, "c")]
heapq.heapify(tasks)
print([heapq.heappop(tasks)[1] for _ in range(len(tasks))])
