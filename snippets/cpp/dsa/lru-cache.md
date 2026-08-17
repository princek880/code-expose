---
lang: cpp
topic: dsa
tier: 3
tags: [lru, cache, list, unordered-map]
note: A list plus an unordered_map of iterators gives O(1) get and put with true recency order.
---
#include <list>
#include <unordered_map>
#include <utility>

class LRU {
public:
    explicit LRU(int capacity) : capacity_(capacity) {}

    int get(int key) {
        auto it = index_.find(key);
        if (it == index_.end()) return -1;
        order_.splice(order_.begin(), order_, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = index_.find(key);
        if (it != index_.end()) {
            it->second->second = value;
            order_.splice(order_.begin(), order_, it->second);
            return;
        }
        if (static_cast<int>(order_.size()) >= capacity_) {
            index_.erase(order_.back().first);
            order_.pop_back();
        }
        order_.emplace_front(key, value);
        index_[key] = order_.begin();
    }

private:
    int capacity_;
    std::list<std::pair<int, int>> order_;
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> index_;
};

int demo() {
    LRU cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    int a = cache.get(1);
    cache.put(3, 3);
    int b = cache.get(2);
    return a * 10 + (b + 1);
}
