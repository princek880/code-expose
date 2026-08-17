---
lang: python
topic: dsa
tier: 3
tags: [linked-list, floyd, cycle]
note: After they meet, restarting one pointer at the head finds the entry node in n more steps.
---
class Node:
    def __init__(self, val, nxt=None):
        self.val, self.next = val, nxt

def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            slow = head
            while slow is not fast:
                slow, fast = slow.next, fast.next
            return slow
    return None

a, b, c = Node(1), Node(2), Node(3)
a.next, b.next, c.next = b, c, b
found = cycle_start(a)
print(found.val if found else None, cycle_start(Node(9)))
