---
lang: cpp
topic: nways
tier: 2
tags: [nways, fibonacci, recursion]
note: The recursive version recomputes every subproblem exponentially; the loop computes each one exactly once.
---
long long fib_recursive(int n) {
    return n < 2 ? n : fib_recursive(n - 1) + fib_recursive(n - 2);
}

long long fib_iterative(int n) {
    long long a = 0, b = 1;
    for (int i = 0; i < n; ++i) {
        long long next = a + b;
        a = b;
        b = next;
    }
    return a;
}

int demo() {
    return static_cast<int>(fib_recursive(15) + fib_iterative(50) % 1000);
}
