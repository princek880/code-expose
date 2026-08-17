---
lang: cpp
topic: low-latency
tier: 3
tags: [data-layout, hot-cold, cache]
note: Splitting rarely-touched fields into a side table keeps the hot loop's cache lines dense.
---
#include <string>
#include <vector>

struct EntityHot {
    float x{}, y{}, vx{}, vy{};
};

struct EntityCold {
    std::string name;
    std::string description;
};

class World {
public:
    int spawn(float x, float y, std::string name) {
        hot_.push_back({x, y, 0, 0});
        cold_.push_back({std::move(name), ""});
        return static_cast<int>(hot_.size()) - 1;
    }

    void step(float dt) {
        for (auto& e : hot_) {
            e.x += e.vx * dt;
            e.y += e.vy * dt;
        }
    }

private:
    std::vector<EntityHot> hot_;
    std::vector<EntityCold> cold_;
};

int demo() {
    World w;
    w.spawn(0, 0, "player");
    w.step(0.016f);
    return static_cast<int>(sizeof(EntityHot));
}
