---
lang: python
topic: concurrency
tier: 4
tags: [multiprocessing, shared-memory, buffer]
note: shared_memory gives processes one buffer with no pickling, but you must unlink it exactly once.
---
from multiprocessing import shared_memory
import numpy as np

def main():
    src = np.arange(12, dtype=np.int64)
    shm = shared_memory.SharedMemory(create=True, size=src.nbytes)
    try:
        view = np.ndarray(src.shape, dtype=src.dtype, buffer=shm.buf)
        view[:] = src
        view[0] = 99
        attached = shared_memory.SharedMemory(name=shm.name)
        mirror = np.ndarray(src.shape, dtype=src.dtype, buffer=attached.buf)
        result = (mirror[0], mirror.sum(), shm.name == attached.name)
        attached.close()
        return result
    finally:
        shm.close()
        shm.unlink()

if __name__ == "__main__":
    print(main())
