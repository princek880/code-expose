---
lang: cpp
topic: templates-meta
tier: 3
tags: [constexpr, recursion, compile-time]
note: A constexpr function is an ordinary function that also happens to be usable in a constant expression.
---
constexpr unsigned long long fib(int n) {
    return n < 2 ? static_cast<unsigned long long>(n) : fib(n - 1) + fib(n - 2);
}

constexpr int gcd(int a, int b) {
    while (b) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

static_assert(fib(10) == 55);
static_assert(gcd(48, 18) == 6);

int demo() {
    constexpr auto f20 = fib(20);
    return static_cast<int>(f20 % 1000) + gcd(100, 75);
}
