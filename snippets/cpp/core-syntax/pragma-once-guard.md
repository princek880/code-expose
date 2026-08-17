---
lang: cpp
topic: core-syntax
tier: 1
tags: [header, include-guard, inline]
note: Header guards stop double inclusion; inline lets a definition live in a header legally.
---
#ifndef ENGINE_MATH_HPP
#define ENGINE_MATH_HPP

namespace engine {
    inline constexpr double kPi = 3.14159265358979323846;

    inline double circumference(double radius) {
        return 2.0 * kPi * radius;
    }

    struct Vec2 {
        double x{}, y{};
    };
}

#endif
