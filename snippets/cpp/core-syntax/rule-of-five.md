---
lang: cpp
topic: core-syntax
tier: 3
tags: [rule-of-five, move, destructor]
note: Declaring any one of the five suppresses some of the others, so declare all five or none.
---
#include <cstddef>
#include <utility>

class Owner {
public:
    explicit Owner(std::size_t n) : data_(new int[n]{}), size_(n) {}
    ~Owner() { delete[] data_; }

    Owner(const Owner& other) : data_(new int[other.size_]), size_(other.size_) {
        for (std::size_t i = 0; i < size_; ++i) data_[i] = other.data_[i];
    }
    Owner& operator=(const Owner& other) {
        Owner copy(other);
        swap(copy);
        return *this;
    }
    Owner(Owner&& other) noexcept : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }
    Owner& operator=(Owner&& other) noexcept {
        swap(other);
        return *this;
    }
    void swap(Owner& other) noexcept {
        std::swap(data_, other.data_);
        std::swap(size_, other.size_);
    }

private:
    int* data_{};
    std::size_t size_{};
};
