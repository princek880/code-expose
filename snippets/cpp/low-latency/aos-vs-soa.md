---
lang: cpp
topic: low-latency
tier: 3
tags: [data-layout, aos, soa, cache]
note: SoA gives each field its own contiguous stream, so a pass over one field touches nothing else.
---
#include <vector>

struct ParticleAoS {
    float x{}, y{}, z{}, mass{};
};

struct ParticlesSoA {
    std::vector<float> x, y, z, mass;
    explicit ParticlesSoA(std::size_t n) : x(n), y(n), z(n), mass(n) {}
};

float sum_x_aos(const std::vector<ParticleAoS>& ps) {
    float total = 0;
    for (const auto& p : ps) total += p.x;
    return total;
}

float sum_x_soa(const ParticlesSoA& ps) {
    float total = 0;
    for (float x : ps.x) total += x;
    return total;
}

int demo() {
    std::vector<ParticleAoS> aos(4);
    ParticlesSoA soa(4);
    return static_cast<int>(sum_x_aos(aos) + sum_x_soa(soa)) + static_cast<int>(sizeof(ParticleAoS));
}
