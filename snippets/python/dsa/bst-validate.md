---
lang: python
topic: dsa
tier: 2
tags: [bst, validate, bounds]
note: Checking only parent against child is the classic wrong answer; carry the bounds down.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def valid(node, lo=float("-inf"), hi=float("inf")):
    if node is None:
        return True
    if not lo < node.val < hi:
        return False
    return valid(node.left, lo, node.val) and valid(node.right, node.val, hi)

good = T(5, T(3, T(1), T(4)), T(8))
bad = T(5, T(3, T(1), T(6)), T(8))
print(valid(good), valid(bad))
