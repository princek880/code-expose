---
lang: cpp
topic: stl
tier: 2
tags: [stl, vector, deque, array]
note: vector reallocates and invalidates everything; deque only invalidates iterators, not references.
---
#include <array>
#include <deque>
#include <list>
#include <vector>

std::size_t demo() {
    std::vector<int> v{1, 2, 3};
    v.reserve(16);
    v.insert(v.begin() + 1, 99);
    v.emplace_back(4);

    std::deque<int> d{1, 2};
    d.push_front(0);
    d.push_back(3);

    std::list<int> l{5, 1, 4};
    l.sort();
    l.splice(l.end(), l, l.begin());

    std::array<int, 3> a{7, 8, 9};
    return v.size() + d.size() + l.size() + a.size() + v.capacity();
}
