---
lang: cpp
topic: nways
tier: 2
tags: [nways, file-io, ifstream, getline]
note: getline streams one line at a time; the istreambuf_iterator constructor slurps the whole file in one shot.
---
#include <fstream>
#include <iterator>
#include <sstream>
#include <string>

std::size_t demo() {
    {
        std::ofstream out("nways_demo.txt");
        out << "line one\nline two\nline three\n";
    }

    std::size_t line_count = 0;
    std::ifstream in("nways_demo.txt");
    std::string line;
    while (std::getline(in, line)) ++line_count;

    std::ifstream in2("nways_demo.txt");
    std::string whole((std::istreambuf_iterator<char>(in2)), std::istreambuf_iterator<char>());

    std::remove("nways_demo.txt");
    return line_count + whole.size();
}
