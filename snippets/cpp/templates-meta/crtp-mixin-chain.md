---
lang: cpp
topic: templates-meta
tier: 4
tags: [crtp, mixin]
note: Chaining CRTP mixins stacks static behaviour, each layer casting back to the full derived type.
---
template <typename Derived>
struct Comparable {
    bool operator!=(const Derived& o) const {
        return !(static_cast<const Derived&>(*this) == o);
    }
    bool operator<=(const Derived& o) const {
        const auto& self = static_cast<const Derived&>(*this);
        return self < o || self == o;
    }
};

template <typename Derived>
struct Printable {
    const char* label() const { return "value"; }
};

struct Point : Comparable<Point>, Printable<Point> {
    int x{}, y{};
    Point(int px, int py) : x(px), y(py) {}
    bool operator==(const Point& o) const { return x == o.x && y == o.y; }
    bool operator<(const Point& o) const { return x < o.x; }
};

int demo() {
    Point a{1, 2}, b{1, 2}, c{3, 4};
    return (a != c) + (a <= b) + static_cast<int>(a.label()[0]);
}
