---
lang: cpp
topic: stl
tier: 3
tags: [stl, next-permutation, set-intersection]
note: Both set algorithms require sorted input; on unsorted ranges they silently give nonsense.
---
#include <algorithm>
#include <iterator>
#include <vector>

std::size_t demo() {
    std::vector<int> p{1, 2, 3};
    int count = 0;
    do { ++count; } while (std::next_permutation(p.begin(), p.end()));

    std::vector<int> a{1, 2, 3, 4}, b{3, 4, 5}, out;
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(out));
    std::vector<int> diff;
    std::set_difference(a.begin(), a.end(), b.begin(), b.end(), std::back_inserter(diff));

    return static_cast<std::size_t>(count) + out.size() + diff.size();
}
