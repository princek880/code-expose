---
lang: python
topic: dsa
tier: 4
tags: [tree, morris, threading]
note: Morris borrows the predecessor's right pointer as a return path, so space is O(1).
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def morris_inorder(root):
    out, cur = [], root
    while cur:
        if not cur.left:
            out.append(cur.val)
            cur = cur.right
            continue
        pred = cur.left
        while pred.right and pred.right is not cur:
            pred = pred.right
        if pred.right is None:
            pred.right = cur
            cur = cur.left
        else:
            pred.right = None
            out.append(cur.val)
            cur = cur.right
    return out

print(morris_inorder(T(4, T(2, T(1), T(3)), T(6, T(5)))))
