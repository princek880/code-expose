---
lang: python
topic: core-syntax
tier: 3
tags: [generator, delegation]
note: yield from delegates iteration and forwards send/throw to the sub-generator.
---
def flatten(node):
    for item in node:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, [3, [4, 5]], 6], (7, 8)]
print(list(flatten(nested)))
print(max(flatten(nested)) - min(flatten(nested)))
