---
lang: cpp
topic: dsa
tier: 2
tags: [linked-list, unique-ptr, manual-node]
note: Ownership walks forward via unique_ptr while a raw Node* trails behind as a non-owning cursor.
---
#include <memory>

struct ListNode {
    int val{};
    std::unique_ptr<ListNode> next;
    explicit ListNode(int v) : val(v) {}
};

std::unique_ptr<ListNode> reverse(std::unique_ptr<ListNode> head) {
    std::unique_ptr<ListNode> prev;
    while (head) {
        auto next = std::move(head->next);
        head->next = std::move(prev);
        prev = std::move(head);
        head = std::move(next);
    }
    return prev;
}

int demo() {
    auto head = std::make_unique<ListNode>(1);
    head->next = std::make_unique<ListNode>(2);
    head->next->next = std::make_unique<ListNode>(3);
    auto reversed = reverse(std::move(head));
    return reversed->val * 100 + reversed->next->val * 10 + reversed->next->next->val;
}
