---
lang: cpp
topic: core-syntax
tier: 3
tags: [operator-overloading, subscript, span]
note: operator() takes several indices; operator[] takes one, so a row view is the natural return.
---
#include <cstddef>
#include <span>
#include <vector>

class Grid {
public:
    Grid(int rows, int cols) : rows_(rows), cols_(cols), cells_(rows * cols) {}

    int& operator()(int r, int c) { return cells_[r * cols_ + c]; }
    const int& operator()(int r, int c) const { return cells_[r * cols_ + c]; }

    std::span<int> operator[](int row) {
        return {cells_.data() + row * cols_, static_cast<std::size_t>(cols_)};
    }
    std::span<const int> operator[](int row) const {
        return {cells_.data() + row * cols_, static_cast<std::size_t>(cols_)};
    }

private:
    int rows_{}, cols_{};
    std::vector<int> cells_;
};

int demo() {
    Grid g(3, 3);
    g(1, 1) = 5;
    g[2][0] = 7;
    return g(1, 1) + g[2][0] + static_cast<int>(g[0].size());
}
