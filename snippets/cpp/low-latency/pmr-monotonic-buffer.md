---
lang: cpp
topic: low-latency
tier: 4
tags: [pmr, monotonic-buffer-resource, allocator]
note: A pmr container's allocator is a runtime property, not a template parameter, so the type stays simple.
---
#include <array>
#include <memory_resource>
#include <vector>

int demo() {
    std::array<std::byte, 256> buffer{};
    std::pmr::monotonic_buffer_resource resource(buffer.data(), buffer.size());
    std::pmr::vector<int> v(&resource);
    v.reserve(8);
    for (int i = 0; i < 8; ++i) v.push_back(i * i);

    std::pmr::vector<int> w(&resource);
    w.push_back(100);

    return v.back() + w.back() + static_cast<int>(v.get_allocator().resource() == &resource);
}
