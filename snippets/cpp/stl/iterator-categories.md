---
lang: cpp
topic: stl
tier: 4
tags: [stl, iterator-category, tag-dispatch]
note: Random access gives O(1) distance; a forward iterator has to walk, so the tag picks the algorithm.
---
#include <forward_list>
#include <iterator>
#include <vector>

template <typename It>
std::size_t count_steps(It first, It last) {
    if constexpr (std::random_access_iterator<It>) {
        return static_cast<std::size_t>(last - first);
    } else {
        std::size_t n = 0;
        for (; first != last; ++first) ++n;
        return n;
    }
}

std::size_t demo() {
    std::vector<int> v{1, 2, 3, 4};
    std::forward_list<int> fl{1, 2, 3};
    static_assert(std::random_access_iterator<std::vector<int>::iterator>);
    return count_steps(v.begin(), v.end()) + count_steps(fl.begin(), fl.end());
}
