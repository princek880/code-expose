---
lang: cpp
topic: low-latency
tier: 3
tags: [object-pool, freelist, reuse]
note: A freelist reuses freed slots via an intrusive next pointer, so steady-state acquire never allocates.
---
#include <cstddef>
#include <memory>
#include <vector>

template <typename T>
class Pool {
public:
    explicit Pool(std::size_t n) : storage_(n) {
        for (std::size_t i = 0; i + 1 < n; ++i) free_.push_back(&storage_[i]);
        for (std::size_t i = 0; i < n; ++i) free_.push_back(&storage_[n - 1 - i]);
    }

    T* acquire() {
        if (free_.empty()) return nullptr;
        T* p = free_.back();
        free_.pop_back();
        return p;
    }

    void release(T* p) { free_.push_back(p); }

    std::size_t available() const { return free_.size(); }

private:
    std::vector<T> storage_;
    std::vector<T*> free_;
};

int demo() {
    Pool<int> pool(4);
    int* a = pool.acquire();
    int* b = pool.acquire();
    *a = 1; *b = 2;
    pool.release(a);
    std::size_t avail = pool.available();
    return *b + static_cast<int>(avail);
}
