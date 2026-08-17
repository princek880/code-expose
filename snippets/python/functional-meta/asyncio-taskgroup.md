---
lang: python
topic: functional-meta
tier: 4
tags: [asyncio, taskgroup, structured-concurrency]
note: A TaskGroup will not exit until every child finishes, and one failure cancels the siblings.
---
import asyncio

async def work(n):
    await asyncio.sleep(0.01 * n)
    return n

async def main():
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(work(n)) for n in (3, 1, 2)]
    return [t.result() for t in tasks]

async def failing():
    caught = 0
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(work(5))
            tg.create_task(asyncio.sleep(0, result=None))
            raise RuntimeError("abort")
    except* RuntimeError as eg:
        caught = len(eg.exceptions)
    return caught

print(asyncio.run(main()), asyncio.run(failing()))
