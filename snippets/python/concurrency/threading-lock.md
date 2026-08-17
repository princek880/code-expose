---
lang: python
topic: concurrency
tier: 3
tags: [threading, lock, race-condition]
note: Without the lock this counter loses increments; += is read, add and write, not one step.
---
import threading

counter = 0
lock = threading.Lock()

def bump(times):
    global counter
    for _ in range(times):
        with lock:
            counter += 1

threads = [threading.Thread(target=bump, args=(20000,)) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(counter, counter == 80000)
