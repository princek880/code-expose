---
lang: cpp
topic: templates-meta
tier: 4
tags: [crtp, static-polymorphism]
note: CRTP dispatches through the derived type at compile time, so there is no vtable and no virtual call.
---
template <typename Derived>
struct Shape {
    double area() const {
        return static_cast<const Derived*>(this)->area_impl();
    }
};

struct Circle : Shape<Circle> {
    double r;
    explicit Circle(double radius) : r(radius) {}
    double area_impl() const { return 3.14159 * r * r; }
};

struct Square : Shape<Square> {
    double s;
    explicit Square(double side) : s(side) {}
    double area_impl() const { return s * s; }
};

template <typename T>
double total_area(const Shape<T>& shape) {
    return shape.area();
}

int demo() {
    Circle c(2.0);
    Square s(3.0);
    return static_cast<int>(total_area(c) + total_area(s));
}
