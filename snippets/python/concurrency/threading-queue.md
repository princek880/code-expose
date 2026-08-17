---
lang: python
topic: concurrency
tier: 3
tags: [threading, queue, producer-consumer]
note: A sentinel per consumer is the simplest clean shutdown; task_done pairs with join.
---
import queue, threading

work = queue.Queue(maxsize=8)
results = queue.Queue()
SENTINEL = object()

def consumer():
    while True:
        item = work.get()
        if item is SENTINEL:
            work.task_done()
            return
        results.put(item * item)
        work.task_done()

workers = [threading.Thread(target=consumer) for _ in range(3)]
for w in workers:
    w.start()
for n in range(20):
    work.put(n)
for _ in workers:
    work.put(SENTINEL)
work.join()
for w in workers:
    w.join()
print(results.qsize(), sum(results.get() for _ in range(20)))
