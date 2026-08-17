---
lang: cpp
topic: templates-meta
tier: 3
tags: [perfect-forwarding, forwarding-reference, std-forward]
note: T&& in a deduced context is a forwarding reference, not an rvalue reference; std::forward restores its value category.
---
#include <utility>
#include <vector>

struct Widget {
    int id{};
    explicit Widget(int i) : id(i) {}
    Widget(const Widget&) { id = -1; }
    Widget(Widget&&) noexcept = default;
};

template <typename T, typename... Args>
T make(Args&&... args) {
    return T(std::forward<Args>(args)...);
}

template <typename Container, typename T>
void push(Container& c, T&& value) {
    c.push_back(std::forward<T>(value));
}

int demo() {
    auto w = make<Widget>(7);
    std::vector<Widget> v;
    push(v, Widget(1));
    Widget named(2);
    push(v, named);
    return w.id + v[0].id + v[1].id;
}
