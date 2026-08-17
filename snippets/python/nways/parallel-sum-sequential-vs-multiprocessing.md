---
lang: python
topic: nways
tier: 3
tags: [nways, parallel-sum, multiprocessing]
note: multiprocessing sidesteps the GIL for CPU-bound work, but pickling the chunk and the result is not free.
---
from multiprocessing import Pool

def partial_sum(chunk):
    return sum(chunk)

def main():
    xs = list(range(100_000))
    sequential = sum(xs)

    chunks = [xs[i:i + 25_000] for i in range(0, len(xs), 25_000)]
    with Pool(processes=4) as pool:
        parallel = sum(pool.map(partial_sum, chunks))

    return sequential, parallel

if __name__ == "__main__":
    print(main())
