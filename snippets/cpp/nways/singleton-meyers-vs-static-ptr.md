---
lang: cpp
topic: nways
tier: 3
tags: [nways, singleton, meyers]
note: A function-local static is guaranteed thread-safe initialisation since C++11; the raw pointer version is not.
---
class MeyersSingleton {
public:
    static MeyersSingleton& instance() {
        static MeyersSingleton inst;
        return inst;
    }
    int value{0};

private:
    MeyersSingleton() = default;
};

class PointerSingleton {
public:
    static PointerSingleton* instance() {
        if (!inst_) inst_ = new PointerSingleton();
        return inst_;
    }
    int value{0};

private:
    PointerSingleton() = default;
    static inline PointerSingleton* inst_ = nullptr;
};

int demo() {
    MeyersSingleton::instance().value = 5;
    PointerSingleton::instance()->value = 7;
    return MeyersSingleton::instance().value + PointerSingleton::instance()->value;
}
