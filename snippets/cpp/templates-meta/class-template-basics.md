---
lang: cpp
topic: templates-meta
tier: 2
tags: [template, class-template]
note: Deduction guides let a class template infer its arguments from the constructor, like std::pair does.
---
#include <utility>

template <typename T>
class Box {
public:
    explicit Box(T value) : value_(std::move(value)) {}
    const T& get() const { return value_; }
    void set(T value) { value_ = std::move(value); }

private:
    T value_;
};

template <typename T>
Box(T) -> Box<T>;

int demo() {
    Box<int> a(5);
    Box b(3.5);
    a.set(a.get() + 1);
    return a.get() + static_cast<int>(b.get());
}
