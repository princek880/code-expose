---
lang: python
topic: dsa
tier: 3
tags: [dp, tree, rerooting]
note: Return both states from every node; the parent picks whichever one it is allowed to use.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def rob_tree(node):
    if node is None:
        return 0, 0
    lt, ls = rob_tree(node.left)
    rt, rs = rob_tree(node.right)
    take = node.val + ls + rs
    skip = max(lt, ls) + max(rt, rs)
    return take, skip

root = T(3, T(2, None, T(3)), T(3, None, T(1)))
print(max(rob_tree(root)))
