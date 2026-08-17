---
lang: cpp
topic: stl
tier: 2
tags: [stringstream, parsing, formatting]
note: Streaming into a variable sets failbit on bad input, so test the stream before trusting the value.
---
#include <sstream>
#include <string>
#include <vector>

std::vector<int> parse_csv(const std::string& line) {
    std::vector<int> out;
    std::istringstream in(line);
    std::string cell;
    while (std::getline(in, cell, ',')) {
        std::istringstream conv(cell);
        int value{};
        if (conv >> value) out.push_back(value);
    }
    return out;
}

std::size_t demo() {
    std::ostringstream os;
    os << "n=" << 42 << " f=" << 1.5;
    return parse_csv("1,2,x,4").size() + os.str().size();
}
