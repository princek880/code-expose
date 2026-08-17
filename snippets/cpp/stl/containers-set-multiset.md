---
lang: cpp
topic: stl
tier: 2
tags: [stl, set, multiset, equal-range]
note: multiset keeps duplicates; equal_range hands you the whole run of equal keys at once.
---
#include <set>

int demo() {
    std::set<int> s{5, 1, 3};
    auto [it, inserted] = s.insert(3);

    std::multiset<int> ms{1, 2, 2, 2, 5};
    auto [lo, hi] = ms.equal_range(2);

    int span = 0;
    for (auto cur = lo; cur != hi; ++cur) span += *cur;

    return static_cast<int>(s.size()) + static_cast<int>(inserted)
         + static_cast<int>(ms.count(2)) + span + *s.begin();
}
