---
lang: python
topic: dsa
tier: 2
tags: [tree, dfs, traversal]
note: The three orders differ only in where the visit sits relative to the two recursions.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def preorder(n):
    return [n.val] + preorder(n.left) + preorder(n.right) if n else []

def inorder(n):
    return inorder(n.left) + [n.val] + inorder(n.right) if n else []

def postorder(n):
    return postorder(n.left) + postorder(n.right) + [n.val] if n else []

root = T(1, T(2, T(4), T(5)), T(3))
print(preorder(root), inorder(root), postorder(root))
