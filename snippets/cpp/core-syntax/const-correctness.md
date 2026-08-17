---
lang: cpp
topic: core-syntax
tier: 2
tags: [const, pointer, top-level]
note: Read declarations right to left: const T* is a pointer to const, T* const is a const pointer.
---
int demo() {
    int a = 1, b = 2;

    const int* to_const = &a;
    int* const const_ptr = &a;
    const int* const both = &a;

    to_const = &b;
    *const_ptr = 5;

    const int& ref = a;
    return *to_const + *const_ptr + *both + ref;
}

struct Widget {
    int value{};
    int get() const { return value; }
    void set(int v) { value = v; }
};
