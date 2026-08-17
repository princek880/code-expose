---
lang: cpp
topic: low-latency
tier: 2
tags: [string-view, zero-copy, parsing]
note: Slicing with string_view touches no heap; only converting to std::string ever allocates.
---
#include <string_view>
#include <vector>

std::vector<std::string_view> split(std::string_view text, char sep) {
    std::vector<std::string_view> out;
    std::size_t start = 0;
    for (std::size_t i = 0; i <= text.size(); ++i) {
        if (i == text.size() || text[i] == sep) {
            out.push_back(text.substr(start, i - start));
            start = i + 1;
        }
    }
    return out;
}

int demo() {
    std::string_view csv = "10,20,30,40";
    auto parts = split(csv, ',');
    return static_cast<int>(parts.size()) + static_cast<int>(parts[0].data() == csv.data());
}
