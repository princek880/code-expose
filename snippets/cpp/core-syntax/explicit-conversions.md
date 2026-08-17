---
lang: cpp
topic: core-syntax
tier: 2
tags: [explicit, conversion, static-cast]
note: explicit blocks the implicit conversion, so a Meters can never silently become an int.
---
class Meters {
public:
    explicit Meters(double v) : value_(v) {}
    explicit operator double() const { return value_; }
    double raw() const { return value_; }

private:
    double value_{};
};

double demo() {
    Meters m{3.5};
    double d = static_cast<double>(m);
    auto squared = static_cast<int>(m.raw() * m.raw());
    return d + squared + Meters{1.5}.raw();
}
