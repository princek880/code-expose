---
lang: cpp
topic: nways
tier: 2
tags: [nways, random, mt19937, distribution]
note: The engine produces raw bits; the distribution shapes them, so mt19937 alone is not a uniform int generator.
---
#include <random>

int demo() {
    std::random_device rd;
    std::mt19937 engine(rd());
    std::mt19937 seeded_engine(42);

    std::uniform_int_distribution<int> dice(1, 6);
    std::uniform_real_distribution<double> unit(0.0, 1.0);
    std::normal_distribution<double> gauss(0.0, 1.0);

    int roll = dice(seeded_engine);
    double u = unit(seeded_engine);
    double g = gauss(seeded_engine);

    return static_cast<int>(roll >= 1 && roll <= 6) + static_cast<int>(u >= 0.0 && u < 1.0)
         + static_cast<int>(g == g);
}
