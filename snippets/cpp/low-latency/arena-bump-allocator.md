---
lang: cpp
topic: low-latency
tier: 4
tags: [allocator, arena, bump-pointer]
note: A bump allocator never frees individual objects; the whole arena is reclaimed in one shot.
---
#include <cstddef>
#include <cstdint>
#include <memory>
#include <new>

class Arena {
public:
    explicit Arena(std::size_t bytes) : buf_(std::make_unique<std::byte[]>(bytes)), size_(bytes) {}

    void* allocate(std::size_t n, std::size_t align) {
        auto base = reinterpret_cast<std::uintptr_t>(buf_.get()) + offset_;
        auto aligned = (base + align - 1) & ~(align - 1);
        std::size_t new_offset = aligned - reinterpret_cast<std::uintptr_t>(buf_.get()) + n;
        if (new_offset > size_) throw std::bad_alloc();
        offset_ = new_offset;
        return reinterpret_cast<void*>(aligned);
    }

    void reset() { offset_ = 0; }
    std::size_t used() const { return offset_; }

private:
    std::unique_ptr<std::byte[]> buf_;
    std::size_t size_, offset_{0};
};

int demo() {
    Arena arena(1024);
    int* a = new (arena.allocate(sizeof(int), alignof(int))) int(5);
    double* b = new (arena.allocate(sizeof(double), alignof(double))) double(2.5);
    int result = *a + static_cast<int>(*b);
    arena.reset();
    return result + static_cast<int>(arena.used());
}
