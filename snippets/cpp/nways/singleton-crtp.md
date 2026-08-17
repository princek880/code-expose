---
lang: cpp
topic: nways
tier: 4
tags: [nways, singleton, crtp]
note: A CRTP singleton base gives every derived class its own static instance with zero duplicated boilerplate.
---
template <typename Derived>
class SingletonBase {
public:
    static Derived& instance() {
        static Derived inst;
        return inst;
    }

protected:
    SingletonBase() = default;
};

class Logger : public SingletonBase<Logger> {
    friend class SingletonBase<Logger>;
public:
    int lines{0};
private:
    Logger() = default;
};

class Config : public SingletonBase<Config> {
    friend class SingletonBase<Config>;
public:
    int version{1};
private:
    Config() = default;
};

int demo() {
    Logger::instance().lines = 5;
    Config::instance().version = 2;
    return Logger::instance().lines + Config::instance().version
         + static_cast<int>(&Logger::instance() == &Logger::instance());
}
