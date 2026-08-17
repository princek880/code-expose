---
lang: cpp
topic: core-syntax
tier: 3
tags: [raii, scope-guard, destructor]
note: RAII runs the cleanup on every exit path, including the exception you forgot about.
---
#include <utility>

template <typename F>
class ScopeGuard {
public:
    explicit ScopeGuard(F fn) : fn_(std::move(fn)) {}
    ~ScopeGuard() { if (active_) fn_(); }
    void dismiss() noexcept { active_ = false; }

    ScopeGuard(const ScopeGuard&) = delete;
    ScopeGuard& operator=(const ScopeGuard&) = delete;

private:
    F fn_;
    bool active_{true};
};

int demo() {
    int cleaned = 0;
    {
        ScopeGuard guard([&] { cleaned = 1; });
        ScopeGuard skipped([&] { cleaned = 99; });
        skipped.dismiss();
    }
    return cleaned;
}
