---
lang: python
topic: dsa
tier: 2
tags: [linked-list, reverse]
note: The iterative form needs three names; the recursive form trades them for stack depth.
---
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def reverse(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev

def reverse_rec(head, prev=None):
    if not head:
        return prev
    nxt = head.next
    head.next = prev
    return reverse_rec(nxt, head)

def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out

h = Node(1, Node(2, Node(3)))
print(to_list(reverse(h)), to_list(reverse_rec(Node(4, Node(5)))))
