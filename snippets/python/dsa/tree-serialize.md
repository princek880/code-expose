---
lang: python
topic: dsa
tier: 3
tags: [tree, serialize, preorder]
note: Preorder with an explicit null marker is enough to rebuild the tree uniquely.
---
class T:
    def __init__(self, val, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def serialize(n):
    if not n:
        return ["#"]
    return [str(n.val)] + serialize(n.left) + serialize(n.right)

def deserialize(tokens):
    it = iter(tokens)

    def build():
        tok = next(it)
        if tok == "#":
            return None
        return T(int(tok), build(), build())

    return build()

root = T(1, T(2), T(3, T(4)))
blob = serialize(root)
print(",".join(blob), serialize(deserialize(blob)) == blob)
