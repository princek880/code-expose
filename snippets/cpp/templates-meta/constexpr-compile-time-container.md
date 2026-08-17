---
lang: cpp
topic: templates-meta
tier: 4
tags: [constexpr, compile-time-container, array]
note: A constexpr array lives in read-only memory once fully computed at compile time.
---
#include <array>

template <int N>
constexpr std::array<int, N> make_primes_sieve() {
    std::array<bool, N> is_composite{};
    std::array<int, N> primes{};
    int count = 0;
    for (int i = 2; i < N; ++i) {
        if (is_composite[static_cast<unsigned>(i)]) continue;
        primes[static_cast<unsigned>(count++)] = i;
        for (int j = i * i; j < N; j += i) is_composite[static_cast<unsigned>(j)] = true;
    }
    return primes;
}

constexpr auto kPrimes = make_primes_sieve<30>();
static_assert(kPrimes[0] == 2);
static_assert(kPrimes[1] == 3);
static_assert(kPrimes[9] == 29);

int demo() { return kPrimes[5]; }
