---
lang: cpp
topic: dsa
tier: 2
tags: [mergesort, divide-conquer]
note: The <= in the merge step is what keeps the sort stable, exactly as in the Python version.
---
#include <vector>

std::vector<int> mergesort(std::vector<int> xs) {
    if (xs.size() <= 1) return xs;
    std::size_t mid = xs.size() / 2;
    auto left = mergesort({xs.begin(), xs.begin() + static_cast<long>(mid)});
    auto right = mergesort({xs.begin() + static_cast<long>(mid), xs.end()});
    std::vector<int> out;
    std::size_t i = 0, j = 0;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) out.push_back(left[i++]);
        else out.push_back(right[j++]);
    }
    out.insert(out.end(), left.begin() + static_cast<long>(i), left.end());
    out.insert(out.end(), right.begin() + static_cast<long>(j), right.end());
    return out;
}

int demo() {
    auto s = mergesort({5, 2, 9, 1, 5, 6, 0});
    return s.front() * 10 + s.back();
}
