---
lang: cpp
topic: core-syntax
tier: 1
tags: [namespace, using, alias]
note: A namespace alias shortens the call site without dragging every name into scope.
---
namespace engine::detail {
    inline int version() { return 3; }
    struct Config { int width{800}, height{600}; };
}

namespace ed = engine::detail;
using engine::detail::Config;

int run() {
    Config cfg{1024, 768};
    using std::max;
    return max(ed::version(), cfg.width - cfg.height);
}
