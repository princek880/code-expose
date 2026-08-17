---
lang: cpp
topic: templates-meta
tier: 4
tags: [concepts, subsumption, overload-resolution]
note: The more constrained overload wins only when one concept provably subsumes the other, not merely implies it.
---
#include <concepts>

template <typename T>
concept Animal = requires(T t) { t.speak(); };

template <typename T>
concept LoudAnimal = Animal<T> && requires(T t) { t.volume(); };

template <Animal T>
int describe(T) { return 1; }

template <LoudAnimal T>
int describe(T) { return 2; }

struct Dog {
    void speak() const {}
    int volume() const { return 11; }
};

struct Fish {
    void speak() const {}
};

int demo() {
    return describe(Dog{}) + describe(Fish{});
}
