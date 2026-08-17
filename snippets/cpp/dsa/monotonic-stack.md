---
lang: cpp
topic: dsa
tier: 3
tags: [monotonic-stack, next-greater]
note: Each index is pushed and popped once with a vector-as-stack, same amortised linear bound as Python.
---
#include <vector>

std::vector<int> next_greater(const std::vector<int>& xs) {
    std::vector<int> out(xs.size(), -1);
    std::vector<int> stack;
    for (int i = 0; i < static_cast<int>(xs.size()); ++i) {
        while (!stack.empty() && xs[static_cast<std::size_t>(stack.back())] < xs[static_cast<std::size_t>(i)]) {
            out[static_cast<std::size_t>(stack.back())] = xs[static_cast<std::size_t>(i)];
            stack.pop_back();
        }
        stack.push_back(i);
    }
    return out;
}

int demo() {
    auto out = next_greater({2, 1, 2, 4, 3});
    return out[0] * 100 + out[3];
}
