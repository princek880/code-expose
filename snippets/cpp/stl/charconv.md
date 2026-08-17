---
lang: cpp
topic: stl
tier: 3
tags: [charconv, to-chars, from-chars]
note: from_chars never allocates, never throws and never looks at the locale, unlike stoi.
---
#include <array>
#include <charconv>
#include <string_view>
#include <system_error>

int demo() {
    std::string_view text = "1234rest";
    int value{};
    auto [ptr, ec] = std::from_chars(text.data(), text.data() + text.size(), value);
    bool ok = ec == std::errc{};
    std::size_t consumed = static_cast<std::size_t>(ptr - text.data());

    std::array<char, 16> buf{};
    auto res = std::to_chars(buf.data(), buf.data() + buf.size(), 255, 16);
    std::string_view hex(buf.data(), static_cast<std::size_t>(res.ptr - buf.data()));

    return value + static_cast<int>(ok) + static_cast<int>(consumed) + static_cast<int>(hex.size());
}
