---
lang: cpp
topic: stl
tier: 2
tags: [stl, priority-queue, stack, queue]
note: priority_queue is a max-heap by default; pass std::greater to invert it.
---
#include <functional>
#include <queue>
#include <stack>
#include <vector>

int demo() {
    std::priority_queue<int> max_heap;
    std::priority_queue<int, std::vector<int>, std::greater<>> min_heap;
    for (int x : {5, 1, 8, 3}) {
        max_heap.push(x);
        min_heap.push(x);
    }

    std::stack<int> st;
    st.push(1);
    st.push(2);

    std::queue<int> q;
    q.push(10);
    q.push(20);

    return max_heap.top() + min_heap.top() + st.top() + q.front() + q.back();
}
