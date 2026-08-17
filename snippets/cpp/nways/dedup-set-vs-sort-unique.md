---
lang: cpp
topic: nways
tier: 2
tags: [nways, deduplicate, set, unique]
note: std::set dedups on insert at O(log n) each; sort-then-unique dedups a vector in one O(n log n) pass.
---
#include <algorithm>
#include <set>
#include <vector>

int demo() {
    std::vector<int> xs{5, 1, 5, 3, 1, 2};

    std::set<int> via_set(xs.begin(), xs.end());

    std::vector<int> via_sort = xs;
    std::sort(via_sort.begin(), via_sort.end());
    via_sort.erase(std::unique(via_sort.begin(), via_sort.end()), via_sort.end());

    return static_cast<int>(via_set.size()) + static_cast<int>(via_sort.size());
}
