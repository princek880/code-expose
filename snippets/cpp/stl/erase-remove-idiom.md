---
lang: cpp
topic: stl
tier: 3
tags: [stl, erase-remove, erase-if]
note: remove only shuffles survivors forward and returns the new logical end; erase does the shrinking.
---
#include <algorithm>
#include <string>
#include <vector>

std::size_t demo() {
    std::vector<int> v{1, 2, 3, 4, 5, 6};
    v.erase(std::remove_if(v.begin(), v.end(), [](int x) { return x % 2 == 0; }), v.end());

    std::vector<int> w{1, 2, 3, 4, 5, 6};
    std::erase_if(w, [](int x) { return x % 2 == 0; });
    std::erase(w, 3);

    std::string s = "a-b-c";
    std::erase(s, '-');
    return v.size() + w.size() + s.size();
}
