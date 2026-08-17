---
lang: cpp
topic: templates-meta
tier: 4
tags: [policy-based-design, template-parameter]
note: Each policy is an independent template parameter, so behaviour is chosen by composing types, not flags.
---
#include <mutex>

struct NoLock {
    void lock() {}
    void unlock() {}
};

struct RealLock {
    std::mutex m;
    void lock() { m.lock(); }
    void unlock() { m.unlock(); }
};

template <typename T, typename LockPolicy = NoLock>
class Counter {
public:
    void add(T v) {
        policy_.lock();
        value_ += v;
        policy_.unlock();
    }
    T get() const { return value_; }

private:
    T value_{};
    LockPolicy policy_;
};

int demo() {
    Counter<int> fast;
    Counter<int, RealLock> safe;
    fast.add(3);
    safe.add(4);
    return fast.get() + safe.get();
}
