---
lang: python
topic: functional-meta
tier: 3
tags: [asyncio, async-generator, aiter]
note: An async generator is consumed with async for, and it can await between yields.
---
import asyncio

async def ticker(n, delay=0.005):
    for i in range(n):
        await asyncio.sleep(delay)
        yield i

async def main():
    out = [v async for v in ticker(4)]
    doubled = [v * 2 async for v in ticker(3) if v]
    agen = ticker(2)
    first = await anext(agen)
    await agen.aclose()
    return out, doubled, first

print(asyncio.run(main()))
