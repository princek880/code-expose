---
lang: python
topic: nways
tier: 3
tags: [nways, random, xorshift]
note: Xorshift is three shift-xors and no multiply, which is why it out-benchmarks an LCG on most hardware.
---
def xorshift32(seed):
    state = seed & 0xFFFFFFFF
    while True:
        state ^= (state << 13) & 0xFFFFFFFF
        state ^= (state >> 17)
        state ^= (state << 5) & 0xFFFFFFFF
        yield state

gen = xorshift32(12345)
draws = [next(gen) for _ in range(5)]
print(draws, all(0 <= x < 2 ** 32 for x in draws))
