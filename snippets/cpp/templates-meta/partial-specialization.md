---
lang: cpp
topic: templates-meta
tier: 3
tags: [template, partial-specialization]
note: Partial specialization narrows the pattern; it must still leave at least one parameter free.
---
template <typename T>
struct IsPointer {
    static constexpr bool value = false;
};

template <typename T>
struct IsPointer<T*> {
    static constexpr bool value = true;
};

template <typename K, typename V>
struct PairSize {
    static constexpr int value = 2;
};

template <typename K>
struct PairSize<K, K> {
    static constexpr int value = 1;
};

int demo() {
    static_assert(IsPointer<int*>::value);
    static_assert(!IsPointer<int>::value);
    return PairSize<int, double>::value + PairSize<int, int>::value;
}
