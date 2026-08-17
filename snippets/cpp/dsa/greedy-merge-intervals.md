---
lang: cpp
topic: dsa
tier: 2
tags: [greedy, intervals, merge]
note: Sorting by start then extending-or-opening is the same one-pass rule as the Python version.
---
#include <algorithm>
#include <utility>
#include <vector>

std::vector<std::pair<int, int>> merge(std::vector<std::pair<int, int>> intervals) {
    std::sort(intervals.begin(), intervals.end());
    std::vector<std::pair<int, int>> out;
    for (auto& iv : intervals) {
        if (!out.empty() && iv.first <= out.back().second) {
            out.back().second = std::max(out.back().second, iv.second);
        } else {
            out.push_back(iv);
        }
    }
    return out;
}

int demo() {
    auto merged = merge({{1, 3}, {2, 6}, {8, 10}, {15, 18}});
    return static_cast<int>(merged.size()) * 10 + merged.front().second;
}
