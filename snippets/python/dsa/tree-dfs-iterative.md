---
lang: python
topic: dsa
tier: 3
tags: [tree, dfs, stack]
note: Push right before left, so the left child is the one that pops first.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def preorder(root):
    out, stack = [], [root] if root else []
    while stack:
        n = stack.pop()
        out.append(n.val)
        if n.right:
            stack.append(n.right)
        if n.left:
            stack.append(n.left)
    return out

def inorder(root):
    out, stack, cur = [], [], root
    while stack or cur:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        out.append(cur.val)
        cur = cur.right
    return out

root = T(1, T(2, T(4), T(5)), T(3))
print(preorder(root), inorder(root))
