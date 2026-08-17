---
lang: cpp
topic: stl
tier: 2
tags: [string, string-view, lifetime]
note: A string_view does not own anything, so never return one that points at a local string.
---
#include <string>
#include <string_view>

std::size_t count_words(std::string_view text) {
    std::size_t words = 0, pos = 0;
    while ((pos = text.find_first_not_of(' ', pos)) != std::string_view::npos) {
        ++words;
        pos = text.find(' ', pos);
        if (pos == std::string_view::npos) break;
    }
    return words;
}

std::size_t demo() {
    std::string owned = "the quick brown fox";
    std::string_view view = owned;
    auto prefix = view.substr(0, 3);
    return count_words(owned) + count_words("a b") + prefix.size() + owned.starts_with("the");
}
