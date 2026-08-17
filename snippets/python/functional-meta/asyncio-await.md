---
lang: python
topic: functional-meta
tier: 3
tags: [asyncio, await, coroutine]
note: A coroutine does nothing until awaited or scheduled; calling it just builds the object.
---
import asyncio

async def fetch(name, delay):
    await asyncio.sleep(delay)
    return f"{name}:{delay}"

async def main():
    single = await fetch("a", 0.01)
    coro = fetch("b", 0.01)
    print(single, type(coro).__name__)
    return await coro

print(asyncio.run(main()))
