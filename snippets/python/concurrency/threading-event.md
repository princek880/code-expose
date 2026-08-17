---
lang: python
topic: concurrency
tier: 3
tags: [threading, event, signalling]
note: An Event is a one-way latch: once set it stays set, and every waiter wakes at once.
---
import threading, time

ready = threading.Event()
stop = threading.Event()
seen = []

def worker(name):
    ready.wait(timeout=1.0)
    while not stop.is_set():
        seen.append(name)
        time.sleep(0.001)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(3)]
for t in threads:
    t.start()
ready.set()
time.sleep(0.02)
stop.set()
for t in threads:
    t.join()
print(ready.is_set(), len(seen) > 0, len(set(seen)))
