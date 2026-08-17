---
lang: cpp
topic: core-syntax
tier: 3
tags: [shared-ptr, weak-ptr, cycles]
note: Two shared_ptrs pointing at each other never free; one side must be weak.
---
#include <memory>

struct Child;

struct Parent {
    std::shared_ptr<Child> child;
    int id{1};
};

struct Child {
    std::weak_ptr<Parent> parent;
    int id{2};
};

int demo() {
    auto p = std::make_shared<Parent>();
    auto c = std::make_shared<Child>();
    p->child = c;
    c->parent = p;

    int total = static_cast<int>(p.use_count()) + static_cast<int>(c.use_count());
    if (auto locked = c->parent.lock()) total += locked->id;
    return total + (c->parent.expired() ? 0 : 100);
}
