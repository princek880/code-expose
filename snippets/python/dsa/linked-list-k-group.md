---
lang: python
topic: dsa
tier: 4
tags: [linked-list, reverse, k-group]
note: Count k nodes ahead before touching anything, or a short final group gets reversed too.
---
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def reverse_k(head, k):
    node, count = head, 0
    while node and count < k:
        node, count = node.next, count + 1
    if count < k:
        return head
    prev = reverse_k(node, k)
    while count:
        head.next, prev, head = prev, head, head.next
        count -= 1
    return prev

def build(vals):
    head = None
    for v in reversed(vals):
        head = Node(v, head)
    return head

n, out = reverse_k(build([1, 2, 3, 4, 5]), 2), []
while n:
    out.append(n.val)
    n = n.next
print(out)
