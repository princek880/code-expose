---
lang: python
topic: core-syntax
tier: 1
tags: [comprehension, filter]
note: The filter runs before the expression, so guard first and transform second.
---
nums = [3, -1, 4, -1, 5, -9, 2, 6]
squares = [n * n for n in nums if n > 0]
labels = ["+" if n > 0 else "-" for n in nums]
paired = [(i, n) for i, n in enumerate(nums) if i % 2 == 0]
print(squares, labels[:3], paired[:2])
