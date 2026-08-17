---
lang: python
topic: dsa
tier: 2
tags: [bst, insert, search]
note: Returning the subtree root from insert is what lets the caller reattach it in one line.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def insert(node, key):
    if node is None:
        return T(key)
    if key < node.val:
        node.left = insert(node.left, key)
    elif key > node.val:
        node.right = insert(node.right, key)
    return node

def search(node, key):
    while node and node.val != key:
        node = node.left if key < node.val else node.right
    return node

root = None
for k in (5, 3, 8, 1, 4, 7):
    root = insert(root, k)
print(search(root, 4).val, search(root, 6))
