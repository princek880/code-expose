---
lang: cpp
topic: low-latency
tier: 4
tags: [spsc, ring-buffer, lock-free]
note: A power-of-two capacity turns the wraparound modulo into a single AND against a mask.
---
#include <atomic>
#include <cstddef>
#include <optional>
#include <vector>

template <typename T>
class SpscRing {
public:
    explicit SpscRing(std::size_t capacity_pow2) : mask_(capacity_pow2 - 1), buf_(capacity_pow2) {}

    bool push(T value) {
        std::size_t head = head_.load(std::memory_order_relaxed);
        std::size_t next = (head + 1) & mask_;
        if (next == tail_.load(std::memory_order_acquire)) return false;
        buf_[head] = std::move(value);
        head_.store(next, std::memory_order_release);
        return true;
    }

    std::optional<T> pop() {
        std::size_t tail = tail_.load(std::memory_order_relaxed);
        if (tail == head_.load(std::memory_order_acquire)) return std::nullopt;
        T value = std::move(buf_[tail]);
        tail_.store((tail + 1) & mask_, std::memory_order_release);
        return value;
    }

private:
    std::size_t mask_;
    std::vector<T> buf_;
    std::atomic<std::size_t> head_{0}, tail_{0};
};

int demo() {
    SpscRing<int> ring(4);
    ring.push(1);
    ring.push(2);
    int total = *ring.pop() + *ring.pop();
    return total + static_cast<int>(ring.pop().has_value());
}
