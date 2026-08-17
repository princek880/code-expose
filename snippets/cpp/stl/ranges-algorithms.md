---
lang: cpp
topic: stl
tier: 3
tags: [ranges, projection, algorithms]
note: The projection argument removes the need for a comparator lambda in most sorts.
---
#include <algorithm>
#include <ranges>
#include <string>
#include <vector>

struct Person {
    std::string name;
    int age{};
};

std::size_t demo() {
    std::vector<Person> people{{"carol", 41}, {"alice", 30}, {"bob", 35}};

    std::ranges::sort(people, {}, &Person::age);
    auto it = std::ranges::find_if(people, [](int a) { return a > 32; }, &Person::age);
    auto n = std::ranges::count_if(people, [](const Person& p) { return p.age > 31; });
    auto [lo, hi] = std::ranges::minmax(people | std::views::transform(&Person::age));

    return people.front().name.size() + static_cast<std::size_t>(n)
         + static_cast<std::size_t>(it != people.end()) + static_cast<std::size_t>(hi - lo);
}
