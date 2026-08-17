---
lang: cpp
topic: stl
tier: 3
tags: [ranges, views, lazy]
note: Views are lazy and composable: nothing is computed until you iterate the final range.
---
#include <ranges>
#include <vector>

int demo() {
    std::vector<int> v{1, 2, 3, 4, 5, 6, 7, 8};

    auto pipeline = v
        | std::views::filter([](int x) { return x % 2 == 0; })
        | std::views::transform([](int x) { return x * x; })
        | std::views::drop(1)
        | std::views::take(2);

    int total = 0;
    for (int x : pipeline) total += x;

    auto reversed = v | std::views::reverse | std::views::take(3);
    for (int x : reversed) total += x;
    return total;
}
