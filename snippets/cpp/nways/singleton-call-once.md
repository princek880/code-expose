---
lang: cpp
topic: nways
tier: 3
tags: [nways, singleton, call-once]
note: call_once with a static once_flag guarantees the initialiser runs exactly once, even racing across threads.
---
#include <mutex>

class LazySingleton {
public:
    static LazySingleton& instance() {
        std::call_once(flag_, [] { inst_ = new LazySingleton(); });
        return *inst_;
    }
    int value{0};

private:
    LazySingleton() = default;
    static inline LazySingleton* inst_ = nullptr;
    static inline std::once_flag flag_;
};

int demo() {
    LazySingleton::instance().value = 9;
    return LazySingleton::instance().value;
}
