---
lang: python
topic: dsa
tier: 3
tags: [bst, delete, successor]
note: The two-child case copies the in-order successor up, then deletes it from the right subtree.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def delete(node, key):
    if node is None:
        return None
    if key < node.val:
        node.left = delete(node.left, key)
    elif key > node.val:
        node.right = delete(node.right, key)
    else:
        if node.left is None:
            return node.right
        if node.right is None:
            return node.left
        succ = node.right
        while succ.left:
            succ = succ.left
        node.val = succ.val
        node.right = delete(node.right, succ.val)
    return node

def inorder(n):
    return inorder(n.left) + [n.val] + inorder(n.right) if n else []

root = T(5, T(3, T(1), T(4)), T(8, T(7)))
print(inorder(delete(root, 3)), inorder(delete(root, 8)))
