---
lang: cpp
topic: low-latency
tier: 2
tags: [allocation, reserve, small-buffer-optimization]
note: reserve pre-pays every growth; a short std::string never touches the heap at all thanks to SBO.
---
#include <string>
#include <vector>

std::vector<int> build_reserved(int n) {
    std::vector<int> out;
    out.reserve(static_cast<std::size_t>(n));
    for (int i = 0; i < n; ++i) out.push_back(i);
    return out;
}

int demo() {
    auto v = build_reserved(1000);
    std::string small = "tiny";
    std::string big(64, 'x');
    return static_cast<int>(v.capacity() >= v.size()) + static_cast<int>(small.capacity() >= small.size())
         + static_cast<int>(big.size());
}
