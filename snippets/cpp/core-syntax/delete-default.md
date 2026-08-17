---
lang: cpp
topic: core-syntax
tier: 2
tags: [delete, default, non-copyable]
note: = delete removes an overload from the candidate set, which is stricter than making it private.
---
class NonCopyable {
public:
    NonCopyable() = default;
    ~NonCopyable() = default;
    NonCopyable(const NonCopyable&) = delete;
    NonCopyable& operator=(const NonCopyable&) = delete;
    NonCopyable(NonCopyable&&) noexcept = default;
    NonCopyable& operator=(NonCopyable&&) noexcept = default;
};

void take_int(int) {}
void take_int(double) = delete;

int demo() {
    NonCopyable a;
    NonCopyable b(std::move(a));
    take_int(42);
    return 0;
}
