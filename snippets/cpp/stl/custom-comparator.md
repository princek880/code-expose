---
lang: cpp
topic: stl
tier: 3
tags: [stl, comparator, strict-weak-ordering]
note: A comparator must be a strict weak ordering: comp(a, a) has to be false or the sort corrupts memory.
---
#include <queue>
#include <set>
#include <string>
#include <vector>

struct Task {
    int priority{};
    std::string name;
};

struct ByPriority {
    bool operator()(const Task& a, const Task& b) const {
        return a.priority == b.priority ? a.name < b.name : a.priority > b.priority;
    }
};

std::size_t demo() {
    std::set<Task, ByPriority> ordered{{2, "b"}, {1, "a"}, {2, "a"}};
    auto cmp = [](const Task& a, const Task& b) { return a.priority < b.priority; };
    std::priority_queue<Task, std::vector<Task>, decltype(cmp)> pq(cmp);
    pq.push({3, "x"});
    pq.push({9, "y"});
    return ordered.size() + static_cast<std::size_t>(pq.top().priority);
}
