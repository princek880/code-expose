---
lang: cpp
topic: nways
tier: 1
tags: [nways, swap, move]
note: std::swap uses move assignment under the hood, so it is never slower than the hand-written version.
---
#include <utility>

int demo() {
    int a = 1, b = 2;
    std::swap(a, b);

    int x = 3, y = 4;
    int temp = x;
    x = y;
    y = temp;

    return a * 1000 + b * 100 + x * 10 + y;
}
