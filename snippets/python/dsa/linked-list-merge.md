---
lang: python
topic: dsa
tier: 2
tags: [linked-list, merge]
note: A dummy head removes the "is this the first node" branch from the whole loop.
---
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def merge(a, b):
    dummy = tail = Node(0)
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next

def build(vals):
    head = None
    for v in reversed(vals):
        head = Node(v, head)
    return head

m = merge(build([1, 4, 7]), build([2, 3, 8]))
out = []
while m:
    out.append(m.val)
    m = m.next
print(out)
