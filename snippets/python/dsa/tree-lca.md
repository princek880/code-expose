---
lang: python
topic: dsa
tier: 3
tags: [tree, lca]
note: A node whose two subtrees each return something non-null is the split point.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def lca(node, a, b):
    if node is None or node.val in (a, b):
        return node
    left, right = lca(node.left, a, b), lca(node.right, a, b)
    if left and right:
        return node
    return left or right

root = T(3, T(5, T(6), T(2, T(7), T(4))), T(1, T(0), T(8)))
print(lca(root, 6, 4).val, lca(root, 5, 1).val, lca(root, 7, 8).val)
