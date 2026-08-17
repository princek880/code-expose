---
lang: cpp
topic: core-syntax
tier: 2
tags: [constructor, init-list, delegating]
note: Members initialise in declaration order, not in the order you list them.
---
#include <string>
#include <vector>

class Buffer {
public:
    explicit Buffer(std::size_t n) : size_(n), data_(n, 0) {}
    Buffer() : Buffer(16) {}
    Buffer(std::size_t n, std::string tag) : size_(n), data_(n, 1), tag_(std::move(tag)) {}

    std::size_t size() const noexcept { return size_; }
    const std::string& tag() const noexcept { return tag_; }

private:
    std::size_t size_{};
    std::vector<int> data_;
    std::string tag_{"unnamed"};
};
