---
lang: cpp
topic: low-latency
tier: 4
tags: [hashmap, open-addressing, linear-probing]
note: Linear probing needs a tombstone for deletion, or a later lookup can stop searching too early.
---
#include <functional>
#include <optional>
#include <vector>

template <typename K, typename V>
class OpenMap {
public:
    explicit OpenMap(std::size_t capacity) : slots_(capacity) {}

    void insert(K key, V value) {
        std::size_t i = probe(key);
        if (!slots_[i].used) ++count_;
        slots_[i] = {true, false, std::move(key), std::move(value)};
    }

    std::optional<V> get(const K& key) const {
        std::size_t i = std::hash<K>{}(key) % slots_.size();
        for (std::size_t n = 0; n < slots_.size(); ++n) {
            const auto& slot = slots_[(i + n) % slots_.size()];
            if (!slot.used && !slot.tombstone) return std::nullopt;
            if (slot.used && slot.key == key) return slot.value;
        }
        return std::nullopt;
    }

    std::size_t size() const { return count_; }

private:
    struct Slot {
        bool used{false}, tombstone{false};
        K key{};
        V value{};
    };

    std::size_t probe(const K& key) const {
        std::size_t i = std::hash<K>{}(key) % slots_.size();
        for (std::size_t n = 0; n < slots_.size(); ++n) {
            std::size_t idx = (i + n) % slots_.size();
            if (!slots_[idx].used || slots_[idx].key == key) return idx;
        }
        return i;
    }

    std::vector<Slot> slots_;
    std::size_t count_{0};
};

int demo() {
    OpenMap<int, int> m(16);
    m.insert(1, 100);
    m.insert(2, 200);
    m.insert(17, 300);
    return m.get(1).value_or(-1) + m.get(17).value_or(-1) + static_cast<int>(m.size());
}
