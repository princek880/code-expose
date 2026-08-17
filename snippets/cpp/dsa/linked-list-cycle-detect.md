---
lang: cpp
topic: dsa
tier: 3
tags: [linked-list, floyd, raw-pointer]
note: Cycle detection needs raw pointers, not unique_ptr, since the structure is not tree-shaped.
---
struct Node {
    int val{};
    Node* next{};
};

bool has_cycle(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

int demo() {
    Node a{1}, b{2}, c{3};
    a.next = &b; b.next = &c; c.next = &a;
    Node x{9};
    return static_cast<int>(has_cycle(&a)) + static_cast<int>(has_cycle(&x));
}
