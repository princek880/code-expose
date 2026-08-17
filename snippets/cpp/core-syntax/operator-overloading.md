---
lang: cpp
topic: core-syntax
tier: 3
tags: [operator-overloading, spaceship, stream]
note: Define <=> and == and the compiler generates the other four relational operators.
---
#include <compare>
#include <iostream>

struct Money {
    long cents{};

    auto operator<=>(const Money&) const = default;
    bool operator==(const Money&) const = default;

    Money& operator+=(const Money& o) { cents += o.cents; return *this; }
    friend Money operator+(Money a, const Money& b) { return a += b; }
    friend Money operator-(const Money& a) { return Money{-a.cents}; }
    friend std::ostream& operator<<(std::ostream& os, const Money& m) {
        return os << m.cents / 100 << '.' << m.cents % 100;
    }
};

bool demo() {
    Money a{1250}, b{99};
    return (a + b) > a && -a < b && a != b;
}
