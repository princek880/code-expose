---
lang: python
topic: dsa
tier: 3
tags: [linked-list, reorder]
note: Three phases, no extra storage: find the middle, reverse the tail, then weave.
---
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def reorder(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    second, slow.next, prev = slow.next, None, None
    while second:
        second.next, prev, second = prev, second, second.next
    first, second = head, prev
    while second:
        n1, n2 = first.next, second.next
        first.next, second.next = second, n1
        first, second = n1, n2
    return head

h = Node(1, Node(2, Node(3, Node(4, Node(5)))))
n, out = reorder(h), []
while n:
    out.append(n.val)
    n = n.next
print(out)
