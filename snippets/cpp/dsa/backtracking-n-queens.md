---
lang: cpp
topic: dsa
tier: 3
tags: [backtracking, n-queens, unordered-set]
note: row - col and row + col identify the two diagonals in O(1), same trick as Python, now via unordered_set.
---
#include <unordered_set>
#include <vector>

void place(int row, int n, std::vector<int>& cols_used, std::unordered_set<int>& diag,
           std::unordered_set<int>& anti, int& count) {
    if (row == n) {
        ++count;
        return;
    }
    for (int col = 0; col < n; ++col) {
        bool used = false;
        for (int c : cols_used) if (c == col) used = true;
        if (used || diag.count(row - col) || anti.count(row + col)) continue;
        cols_used.push_back(col);
        diag.insert(row - col);
        anti.insert(row + col);
        place(row + 1, n, cols_used, diag, anti, count);
        cols_used.pop_back();
        diag.erase(row - col);
        anti.erase(row + col);
    }
}

int demo() {
    std::vector<int> cols;
    std::unordered_set<int> diag, anti;
    int count = 0;
    place(0, 6, cols, diag, anti, count);
    return count;
}
