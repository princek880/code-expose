---
lang: cpp
topic: stl
tier: 3
tags: [tuple, apply, tie]
note: tie builds a tuple of references, which is why it can both destructure and compare in one line.
---
#include <string>
#include <tuple>

struct Record {
    int id{};
    std::string name;
    double score{};

    bool operator<(const Record& o) const {
        return std::tie(id, name, score) < std::tie(o.id, o.name, o.score);
    }
};

int sum3(int a, int b, int c) { return a + b + c; }

std::size_t demo() {
    auto t = std::make_tuple(1, 2, 3);
    int applied = std::apply(sum3, t);

    int x{}, y{}, z{};
    std::tie(x, y, z) = t;

    auto joined = std::tuple_cat(t, std::make_tuple(std::string("tail")));
    Record a{1, "a", 1.0}, b{1, "b", 0.0};
    return static_cast<std::size_t>(applied + x + y + z)
         + std::tuple_size_v<decltype(joined)> + static_cast<std::size_t>(a < b);
}
