---
lang: cpp
topic: dsa
tier: 2
tags: [bst, insert, search, unique-ptr]
note: insert returns the (possibly new) subtree root, which is how the caller reattaches it in one line.
---
#include <memory>

struct Node {
    int val{};
    std::unique_ptr<Node> left, right;
    explicit Node(int v) : val(v) {}
};

std::unique_ptr<Node> insert(std::unique_ptr<Node> node, int key) {
    if (!node) return std::make_unique<Node>(key);
    if (key < node->val) node->left = insert(std::move(node->left), key);
    else if (key > node->val) node->right = insert(std::move(node->right), key);
    return node;
}

const Node* search(const Node* node, int key) {
    while (node && node->val != key) {
        node = key < node->val ? node->left.get() : node->right.get();
    }
    return node;
}

int demo() {
    std::unique_ptr<Node> root;
    for (int k : {5, 3, 8, 1, 4}) root = insert(std::move(root), k);
    const Node* found = search(root.get(), 4);
    return found ? found->val : -1;
}
