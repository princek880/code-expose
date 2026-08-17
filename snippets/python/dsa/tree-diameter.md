---
lang: python
topic: dsa
tier: 3
tags: [tree, diameter, dfs]
note: Return the height upward while recording the best through-path in a nonlocal.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def diameter(root):
    best = 0

    def height(n):
        nonlocal best
        if not n:
            return 0
        lh, rh = height(n.left), height(n.right)
        best = max(best, lh + rh)
        return 1 + max(lh, rh)

    height(root)
    return best

root = T(1, T(2, T(4, T(6)), T(5)), T(3))
print(diameter(root))
