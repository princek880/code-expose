---
lang: cpp
topic: nways
tier: 1
tags: [nways, sum, accumulate]
note: std::accumulate is the STL name for reduce; both compile down to the same loop with -O2.
---
#include <numeric>
#include <vector>

int demo() {
    std::vector<int> xs{1, 2, 3, 4, 5};

    int manual = 0;
    for (int x : xs) manual += x;

    int via_accumulate = std::accumulate(xs.begin(), xs.end(), 0);
    return manual + via_accumulate;
}
