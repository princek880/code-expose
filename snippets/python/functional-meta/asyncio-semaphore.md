---
lang: python
topic: functional-meta
tier: 3
tags: [asyncio, semaphore, rate-limit]
note: A semaphore caps concurrency; without one, gather over 10k tasks opens 10k sockets at once.
---
import asyncio

async def limited(sem, n, seen):
    async with sem:
        seen.append(len(seen))
        await asyncio.sleep(0.01)
        return n

async def main(limit=3):
    sem = asyncio.Semaphore(limit)
    peak, seen = 0, []
    tasks = [asyncio.create_task(limited(sem, n, seen)) for n in range(9)]
    done = await asyncio.gather(*tasks)
    return done, sem._value == limit

print(asyncio.run(main()))
