---
lang: python
topic: dsa
tier: 2
tags: [greedy, jump-game, reachability]
note: One pass: each time the index reaches the end of the current jump, spend another jump.
---
def can_reach(xs):
    far = 0
    for i, x in enumerate(xs):
        if i > far:
            return False
        far = max(far, i + x)
    return True

def min_jumps(xs):
    jumps = end = far = 0
    for i in range(len(xs) - 1):
        far = max(far, i + xs[i])
        if i == end:
            jumps += 1
            end = far
    return jumps

print(can_reach([2, 3, 1, 1, 4]), can_reach([3, 2, 1, 0, 4]), min_jumps([2, 3, 1, 1, 4]))
