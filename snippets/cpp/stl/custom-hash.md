---
lang: cpp
topic: stl
tier: 3
tags: [stl, hash, unordered-map]
note: Combine field hashes with a shift and xor; adding them collides on any permutation.
---
#include <cstddef>
#include <functional>
#include <string>
#include <unordered_map>

struct Key {
    int id{};
    std::string tag;
    bool operator==(const Key&) const = default;
};

struct KeyHash {
    std::size_t operator()(const Key& k) const noexcept {
        std::size_t h = std::hash<int>{}(k.id);
        h ^= std::hash<std::string>{}(k.tag) + 0x9e3779b9 + (h << 6) + (h >> 2);
        return h;
    }
};

std::size_t demo() {
    std::unordered_map<Key, int, KeyHash> m;
    m[{1, "a"}] = 10;
    m[{2, "b"}] += 5;
    return m.size() + static_cast<std::size_t>(m.at({1, "a"}));
}
