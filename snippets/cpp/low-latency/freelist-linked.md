---
lang: cpp
topic: low-latency
tier: 3
tags: [freelist, intrusive-list, fixed-size]
note: An intrusive freelist stores the next pointer inside the freed block itself, so it costs zero extra memory.
---
#include <cstddef>
#include <memory>

template <std::size_t BlockSize, std::size_t Count>
class FixedFreeList {
public:
    FixedFreeList() {
        for (std::size_t i = 0; i + 1 < Count; ++i) {
            *reinterpret_cast<void**>(&storage_[i * BlockSize]) = &storage_[(i + 1) * BlockSize];
        }
        *reinterpret_cast<void**>(&storage_[(Count - 1) * BlockSize]) = nullptr;
        head_ = &storage_[0];
    }

    void* acquire() {
        if (!head_) return nullptr;
        void* block = head_;
        head_ = *reinterpret_cast<void**>(head_);
        return block;
    }

    void release(void* block) {
        *reinterpret_cast<void**>(block) = head_;
        head_ = block;
    }

private:
    alignas(std::max_align_t) unsigned char storage_[BlockSize * Count]{};
    void* head_{};
};

int demo() {
    FixedFreeList<16, 4> pool;
    void* a = pool.acquire();
    void* b = pool.acquire();
    pool.release(a);
    void* c = pool.acquire();
    return static_cast<int>(a == c) + static_cast<int>(b != nullptr);
}
