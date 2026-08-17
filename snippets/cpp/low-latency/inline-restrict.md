---
lang: cpp
topic: low-latency
tier: 3
tags: [inline, restrict, noinline]
note: restrict tells the compiler two pointers cannot alias, unlocking vectorisation it otherwise cannot risk.
---
inline int square(int x) { return x * x; }

[[gnu::noinline]] int uninlined_square(int x) { return x * x; }

void axpy(int n, float a, const float* __restrict x, float* __restrict y) {
    for (int i = 0; i < n; ++i) y[i] += a * x[i];
}

int demo() {
    float x[4] = {1, 2, 3, 4};
    float y[4] = {0, 0, 0, 0};
    axpy(4, 2.0f, x, y);
    return square(3) + uninlined_square(4) + static_cast<int>(y[3]);
}
