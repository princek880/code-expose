---
lang: cpp
topic: dsa
tier: 2
tags: [quicksort, lomuto, partition]
note: Same one-pass Lomuto partition as the Python version, using std::swap on vector elements.
---
#include <utility>
#include <vector>

void quicksort(std::vector<int>& xs, int lo, int hi) {
    if (lo >= hi) return;
    int pivot = xs[static_cast<std::size_t>(hi)];
    int i = lo;
    for (int j = lo; j < hi; ++j) {
        if (xs[static_cast<std::size_t>(j)] < pivot) {
            std::swap(xs[static_cast<std::size_t>(i)], xs[static_cast<std::size_t>(j)]);
            ++i;
        }
    }
    std::swap(xs[static_cast<std::size_t>(i)], xs[static_cast<std::size_t>(hi)]);
    quicksort(xs, lo, i - 1);
    quicksort(xs, i + 1, hi);
}

int demo() {
    std::vector<int> xs{5, 2, 9, 1, 5, 6, 0};
    quicksort(xs, 0, static_cast<int>(xs.size()) - 1);
    return xs.front() * 10 + xs.back();
}
