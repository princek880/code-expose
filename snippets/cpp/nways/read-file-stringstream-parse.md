---
lang: cpp
topic: nways
tier: 2
tags: [nways, file-io, stringstream, parsing]
note: Reading into a stringstream first decouples parsing from I/O, so the parse logic is trivially testable offline.
---
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

std::vector<int> demo() {
    {
        std::ofstream out("nways_ints.txt");
        out << "10 20 30 40\n";
    }

    std::ifstream in("nways_ints.txt");
    std::stringstream buffer;
    buffer << in.rdbuf();

    std::vector<int> values;
    int v{};
    while (buffer >> v) values.push_back(v);

    std::remove("nways_ints.txt");
    return values;
}

int main() {
    auto v = demo();
    return static_cast<int>(v.size()) + (v.empty() ? 0 : v.back() % 100);
}
