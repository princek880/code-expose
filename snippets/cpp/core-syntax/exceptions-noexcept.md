---
lang: cpp
topic: core-syntax
tier: 2
tags: [exceptions, noexcept, raii]
note: Catch by const reference; catching by value slices the derived exception down to its base.
---
#include <stdexcept>
#include <string>

struct ParseError : std::runtime_error {
    int line{};
    ParseError(int l, const std::string& what)
        : std::runtime_error(what), line(l) {}
};

int parse(const std::string& s) noexcept {
    try {
        if (s.empty()) throw ParseError(1, "empty input");
        return std::stoi(s);
    } catch (const ParseError& e) {
        return -e.line;
    } catch (const std::exception&) {
        return -99;
    }
}

int demo() { return parse("42") + parse("") + parse("abc"); }
