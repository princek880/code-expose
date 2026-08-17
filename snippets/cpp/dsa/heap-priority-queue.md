---
lang: cpp
topic: dsa
tier: 2
tags: [heap, priority-queue]
note: priority_queue with std::greater is a min-heap; the C++ mirror of Python's heapq default.
---
#include <functional>
#include <queue>
#include <vector>

std::vector<int> top_k(std::vector<int> xs, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<>> heap;
    for (int x : xs) {
        heap.push(x);
        if (static_cast<int>(heap.size()) > k) heap.pop();
    }
    std::vector<int> out;
    while (!heap.empty()) {
        out.push_back(heap.top());
        heap.pop();
    }
    return out;
}

int demo() {
    auto k = top_k({3, 1, 9, 7, 2, 8}, 3);
    int total = 0;
    for (int x : k) total += x;
    return total;
}
