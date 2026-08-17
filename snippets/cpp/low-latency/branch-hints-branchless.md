---
lang: cpp
topic: low-latency
tier: 3
tags: [likely-unlikely, branchless, select]
note: A branchless select multiplies by a 0/1 mask instead of jumping, which keeps the pipeline full.
---
int classify(int x) {
    if (x < 0) [[unlikely]] {
        return -1;
    } else if (x == 0) [[unlikely]] {
        return 0;
    }
    return 1;
}

int branchless_max(int a, int b) {
    int diff = a - b;
    int mask = diff >> 31;
    return b + (diff & ~mask);
}

int branchless_select(bool cond, int a, int b) {
    return b ^ ((-static_cast<int>(cond)) & (a ^ b));
}

int demo() {
    return classify(-5) + classify(0) + classify(9)
         + branchless_max(3, 7) + branchless_select(true, 10, 20);
}
