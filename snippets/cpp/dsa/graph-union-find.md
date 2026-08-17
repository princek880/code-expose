---
lang: cpp
topic: dsa
tier: 3
tags: [union-find, dsu, path-compression]
note: A vector<int> parent array with path compression is the standard C++ DSU, no allocation per union.
---
#include <numeric>
#include <vector>

class DSU {
public:
    explicit DSU(int n) : parent_(static_cast<std::size_t>(n)), rank_(static_cast<std::size_t>(n), 0) {
        std::iota(parent_.begin(), parent_.end(), 0);
    }

    int find(int x) {
        while (parent_[static_cast<std::size_t>(x)] != x) {
            parent_[static_cast<std::size_t>(x)] = parent_[static_cast<std::size_t>(parent_[static_cast<std::size_t>(x)])];
            x = parent_[static_cast<std::size_t>(x)];
        }
        return x;
    }

    bool unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank_[static_cast<std::size_t>(ra)] < rank_[static_cast<std::size_t>(rb)]) std::swap(ra, rb);
        parent_[static_cast<std::size_t>(rb)] = ra;
        if (rank_[static_cast<std::size_t>(ra)] == rank_[static_cast<std::size_t>(rb)]) ++rank_[static_cast<std::size_t>(ra)];
        return true;
    }

private:
    std::vector<int> parent_, rank_;
};

int demo() {
    DSU d(6);
    d.unite(0, 1);
    d.unite(1, 2);
    d.unite(3, 4);
    return static_cast<int>(d.find(2) == d.find(0)) + static_cast<int>(d.unite(0, 2));
}
