---
lang: cpp
topic: core-syntax
tier: 1
tags: [reference, pointer, nullptr]
note: A reference must bind on creation and can never be reseated; a pointer can be null and moved.
---
int add_one(int& ref) { return ++ref; }
int add_two(int* ptr) { return ptr ? (*ptr += 2) : 0; }

int demo() {
    int value = 10;
    int& alias = value;
    int* pointer = &value;

    alias = 20;
    *pointer = 30;
    pointer = nullptr;

    add_one(value);
    add_two(&value);
    return value + alias;
}
