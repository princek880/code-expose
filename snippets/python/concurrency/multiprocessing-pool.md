---
lang: python
topic: concurrency
tier: 3
tags: [multiprocessing, pool, cpu-bound]
note: Pool sidesteps the GIL by using processes, so the payload must be picklable.
---
import multiprocessing as mp

def heavy(n):
    return sum(i * i for i in range(n))

def main():
    with mp.Pool(processes=2) as pool:
        squares = pool.map(heavy, [1000, 2000, 3000])
        lazy = list(pool.imap_unordered(heavy, [500, 1500]))
        starred = pool.starmap(pow, [(2, 10), (3, 4)])
    return squares[0], len(lazy), starred

if __name__ == "__main__":
    print(main())
