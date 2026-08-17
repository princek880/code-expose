---
lang: cpp
topic: dsa
tier: 3
tags: [sliding-window, unordered-map]
note: A vector<vector<int>>-adjacent structure here is the frequency map; grow right, shrink left.
---
#include <string>
#include <unordered_map>

int longest_at_most_k_distinct(const std::string& s, int k) {
    std::unordered_map<char, int> counts;
    int left = 0, best = 0;
    for (int right = 0; right < static_cast<int>(s.size()); ++right) {
        ++counts[s[static_cast<std::size_t>(right)]];
        while (static_cast<int>(counts.size()) > k) {
            char c = s[static_cast<std::size_t>(left)];
            if (--counts[c] == 0) counts.erase(c);
            ++left;
        }
        best = std::max(best, right - left + 1);
    }
    return best;
}

int demo() { return longest_at_most_k_distinct("eceba", 2); }
