---
lang: cpp
topic: nways
tier: 1
tags: [nways, string-reverse, two-pointer]
note: std::reverse swaps two-pointer style in place; building a second string is an allocation the in-place version avoids.
---
#include <algorithm>
#include <string>

std::string demo() {
    std::string s = "hello world";

    std::string via_algorithm = s;
    std::reverse(via_algorithm.begin(), via_algorithm.end());

    std::string manual = s;
    std::size_t i = 0, j = manual.size() - 1;
    while (i < j) {
        std::swap(manual[i], manual[j]);
        ++i; --j;
    }
    return via_algorithm == manual ? via_algorithm : "mismatch";
}

int main() {
    auto s = demo();
    return static_cast<int>(s.size());
}
