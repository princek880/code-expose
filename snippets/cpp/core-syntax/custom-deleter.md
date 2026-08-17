---
lang: cpp
topic: core-syntax
tier: 3
tags: [unique-ptr, deleter, raii]
note: A stateless lambda deleter costs nothing extra if you name its type with decltype.
---
#include <cstdio>
#include <memory>

struct FileCloser {
    void operator()(std::FILE* f) const noexcept {
        if (f) std::fclose(f);
    }
};

using FilePtr = std::unique_ptr<std::FILE, FileCloser>;

int demo() {
    FilePtr file{std::fopen("/dev/null", "w")};
    auto arr = std::unique_ptr<int[]>(new int[8]{});
    auto lambda_owned = std::unique_ptr<int, void (*)(int*)>(new int(5), [](int* p) { delete p; });

    arr[3] = 4;
    return (file ? 1 : 0) + arr[3] + *lambda_owned;
}
