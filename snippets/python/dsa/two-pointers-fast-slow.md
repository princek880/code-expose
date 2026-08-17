---
lang: python
topic: dsa
tier: 2
tags: [two-pointers, floyd]
note: Fast moves two, slow moves one; they meet inside the cycle, never before it.
---
def middle(xs):
    slow = fast = 0
    while fast + 1 < len(xs):
        slow, fast = slow + 1, fast + 2
    return xs[slow]

def has_duplicate_cycle(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow, fast = nums[slow], nums[fast]
    return slow

print(middle([1, 2, 3, 4, 5]), has_duplicate_cycle([1, 3, 4, 2, 2]))
