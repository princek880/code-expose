---
lang: cpp
topic: core-syntax
tier: 1
tags: [struct, class, access]
note: struct defaults to public, class to private. That difference is the whole language rule.
---
struct Open {
    int a{1};
    int twice() const { return a * 2; }
};

class Closed {
public:
    explicit Closed(int v) : a_(v) {}
    int twice() const { return a_ * 2; }

private:
    int a_{};
};

class Derived : public Open {
public:
    int thrice() const { return a * 3; }
};

int demo() {
    Open o;
    Closed c{5};
    Derived d;
    return o.twice() + c.twice() + d.thrice();
}
