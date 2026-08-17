---
lang: cpp
topic: stl
tier: 2
tags: [stl, sort, stable-sort]
note: sort is not stable and can reorder equal elements; stable_sort costs more and never does.
---
#include <algorithm>
#include <string>
#include <vector>

struct Row {
    int key{};
    std::string tag;
};

std::size_t demo() {
    std::vector<int> v{5, 2, 9, 1, 5};
    std::sort(v.begin(), v.end());
    std::sort(v.begin(), v.end(), std::greater<>{});

    std::vector<Row> rows{{2, "b"}, {1, "a"}, {2, "a"}};
    std::stable_sort(rows.begin(), rows.end(),
                     [](const Row& a, const Row& b) { return a.key < b.key; });
    std::ranges::sort(v);
    return v.size() + rows.front().tag.size();
}
