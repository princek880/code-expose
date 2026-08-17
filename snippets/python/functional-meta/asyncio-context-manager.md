---
lang: python
topic: functional-meta
tier: 3
tags: [asyncio, async-context-manager]
note: __aenter__ and __aexit__ are the async twins of the with protocol, and both must be coroutines.
---
import asyncio
from contextlib import asynccontextmanager

class Pool:
    def __init__(self, size):
        self.size, self.open = size, 0

    async def __aenter__(self):
        await asyncio.sleep(0)
        self.open += 1
        return self

    async def __aexit__(self, *exc):
        self.open -= 1
        return False

@asynccontextmanager
async def timed(label):
    yield label.upper()

async def main():
    pool = Pool(4)
    async with pool as p, timed("op") as tag:
        return p.open, tag

print(asyncio.run(main()))
