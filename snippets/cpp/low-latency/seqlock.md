---
lang: cpp
topic: low-latency
tier: 4
tags: [seqlock, lock-free, reader-writer]
note: An odd sequence number means a writer is mid-update; the reader retries whenever it sees one.
---
#include <atomic>

template <typename T>
class SeqLock {
public:
    void write(const T& value) {
        seq_.fetch_add(1, std::memory_order_acq_rel);
        value_ = value;
        seq_.fetch_add(1, std::memory_order_release);
    }

    T read() const {
        T copy;
        unsigned before, after;
        do {
            before = seq_.load(std::memory_order_acquire);
            copy = value_;
            after = seq_.load(std::memory_order_acquire);
        } while (before != after || (before & 1));
        return copy;
    }

private:
    std::atomic<unsigned> seq_{0};
    T value_{};
};

int demo() {
    SeqLock<int> lock;
    lock.write(41);
    int a = lock.read();
    lock.write(a + 1);
    return lock.read();
}
