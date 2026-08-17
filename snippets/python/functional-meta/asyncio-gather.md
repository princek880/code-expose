---
lang: python
topic: functional-meta
tier: 3
tags: [asyncio, gather, concurrency]
note: gather preserves argument order in its results, not completion order, and cancels the rest on error.
---
import asyncio, time

async def work(n):
    await asyncio.sleep(0.05 / n)
    return n * n

async def main():
    t0 = time.perf_counter()
    results = await asyncio.gather(*(work(n) for n in (1, 2, 4, 5)))
    elapsed = time.perf_counter() - t0
    mixed = await asyncio.gather(work(1), asyncio.sleep(0, result="x"), return_exceptions=True)
    return results, elapsed < 0.2, mixed

print(asyncio.run(main()))
