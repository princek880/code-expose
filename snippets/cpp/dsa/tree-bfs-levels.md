---
lang: cpp
topic: dsa
tier: 2
tags: [tree, bfs, queue]
note: A plain queue<Node*> over non-owning pointers is the natural BFS frontier in C++.
---
#include <memory>
#include <queue>
#include <vector>

struct TreeNode {
    int val{};
    std::unique_ptr<TreeNode> left, right;
    explicit TreeNode(int v) : val(v) {}
};

std::vector<std::vector<int>> levels(const TreeNode* root) {
    std::vector<std::vector<int>> out;
    if (!root) return out;
    std::queue<const TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        std::vector<int> row;
        for (std::size_t n = q.size(); n > 0; --n) {
            const TreeNode* node = q.front();
            q.pop();
            row.push_back(node->val);
            if (node->left) q.push(node->left.get());
            if (node->right) q.push(node->right.get());
        }
        out.push_back(row);
    }
    return out;
}

int demo() {
    auto root = std::make_unique<TreeNode>(1);
    root->left = std::make_unique<TreeNode>(2);
    root->right = std::make_unique<TreeNode>(3);
    auto rows = levels(root.get());
    return static_cast<int>(rows.size()) * 10 + static_cast<int>(rows.back().size());
}
