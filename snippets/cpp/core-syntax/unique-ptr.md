---
lang: cpp
topic: core-syntax
tier: 2
tags: [unique-ptr, ownership, make-unique]
note: unique_ptr is move-only, so passing one by value transfers ownership visibly at the call site.
---
#include <memory>
#include <utility>
#include <vector>

struct Session {
    int id{};
    explicit Session(int i) : id(i) {}
};

int consume(std::unique_ptr<Session> owned) { return owned->id; }

int demo() {
    auto s = std::make_unique<Session>(7);
    std::vector<std::unique_ptr<Session>> pool;
    pool.push_back(std::make_unique<Session>(1));
    pool.emplace_back(std::move(s));

    Session* borrowed = pool.back().get();
    auto released = std::unique_ptr<Session>(pool.back().release());
    pool.pop_back();
    return consume(std::move(released)) + borrowed->id + static_cast<int>(pool.size());
}
