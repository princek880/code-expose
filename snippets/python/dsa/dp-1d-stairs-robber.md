---
lang: python
topic: dsa
tier: 2
tags: [dp, 1d, rolling]
note: Both recurrences look back exactly two steps, so two scalars replace the whole table.
---
def climb(n):
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

def rob(nums):
    take, skip = 0, 0
    for x in nums:
        take, skip = skip + x, max(skip, take)
    return max(take, skip)

def rob_circular(nums):
    if len(nums) == 1:
        return nums[0]
    return max(rob(nums[1:]), rob(nums[:-1]))

print(climb(10), rob([2, 7, 9, 3, 1]), rob_circular([2, 3, 2]))
