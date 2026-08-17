---
lang: cpp
topic: dsa
tier: 2
tags: [binary-search, invariant]
note: Half-open [lo, hi) with lo = mid + 1 is the C++ mirror of the same invariant as the Python version.
---
#include <vector>

int search(const std::vector<int>& xs, int target) {
    int lo = 0, hi = static_cast<int>(xs.size());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (xs[static_cast<std::size_t>(mid)] == target) return mid;
        if (xs[static_cast<std::size_t>(mid)] < target) lo = mid + 1;
        else hi = mid;
    }
    return -1;
}

int demo() {
    std::vector<int> xs{1, 3, 5, 7, 9, 11};
    return search(xs, 7) * 10 + search(xs, 8);
}
