---
lang: cpp
topic: core-syntax
tier: 2
tags: [aggregate, designated-initializer, brace-init]
note: Braces forbid narrowing conversions, which is why {} is the safer initialiser.
---
#include <array>
#include <vector>

struct Point {
    int x{};
    int y{};
    const char* label{"origin"};
};

int demo() {
    Point a{1, 2};
    Point b{.x = 3, .y = 4};
    Point c{};
    std::array<int, 4> arr{1, 2, 3};
    std::vector<Point> pts{{1, 1}, {2, 2}};

    return a.x + b.y + c.x + arr[2] + static_cast<int>(pts.size());
}
