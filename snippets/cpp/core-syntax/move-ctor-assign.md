---
lang: cpp
topic: core-syntax
tier: 3
tags: [move-constructor, noexcept, vector-growth]
note: A noexcept move constructor is what lets vector reallocate by moving instead of copying.
---
#include <cstddef>
#include <utility>

class Blob {
public:
    explicit Blob(std::size_t n) : n_(n), p_(new char[n]) {}
    ~Blob() { delete[] p_; }

    Blob(Blob&& o) noexcept : n_(o.n_), p_(o.p_) {
        o.n_ = 0;
        o.p_ = nullptr;
    }
    Blob& operator=(Blob&& o) noexcept {
        if (this != &o) {
            delete[] p_;
            n_ = std::exchange(o.n_, 0);
            p_ = std::exchange(o.p_, nullptr);
        }
        return *this;
    }
    Blob(const Blob&) = delete;
    Blob& operator=(const Blob&) = delete;

    std::size_t size() const noexcept { return n_; }

private:
    std::size_t n_{};
    char* p_{};
};
