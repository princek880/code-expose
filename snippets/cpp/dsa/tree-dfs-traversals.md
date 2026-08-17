---
lang: cpp
topic: dsa
tier: 2
tags: [tree, dfs, traversal, unique-ptr]
note: Owning the children via unique_ptr means the whole tree frees itself when the root goes out of scope.
---
#include <memory>
#include <vector>

struct TreeNode {
    int val{};
    std::unique_ptr<TreeNode> left, right;
    explicit TreeNode(int v) : val(v) {}
};

void inorder(const TreeNode* n, std::vector<int>& out) {
    if (!n) return;
    inorder(n->left.get(), out);
    out.push_back(n->val);
    inorder(n->right.get(), out);
}

int demo() {
    auto root = std::make_unique<TreeNode>(2);
    root->left = std::make_unique<TreeNode>(1);
    root->right = std::make_unique<TreeNode>(3);
    std::vector<int> out;
    inorder(root.get(), out);
    return out[0] * 100 + out[1] * 10 + out[2];
}
