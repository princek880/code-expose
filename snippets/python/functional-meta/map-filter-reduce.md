---
lang: python
topic: functional-meta
tier: 2
tags: [functional, map, reduce]
note: map and filter are lazy iterators; a comprehension is usually clearer unless the function exists already.
---
from functools import reduce
from operator import add, mul

nums = [1, 2, 3, 4, 5, 6]
print(list(map(str, nums)), list(filter(lambda n: n % 2 == 0, nums)))
print(reduce(add, nums), reduce(mul, nums, 1))
print(reduce(lambda acc, n: acc + [acc[-1] + n], nums[1:], [nums[0]]))
print(list(map(pow, nums, [2] * len(nums))))
print(sum(map(len, map(str, nums))))
