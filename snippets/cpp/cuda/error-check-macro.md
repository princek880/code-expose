---
lang: cpp
topic: cuda
tier: 3
tags: [cuda, error-handling, macro]
note: Every CUDA call returns a status; wrapping it in a macro is the only way anyone actually checks it.
---
#include <cstdio>
#include <cstdlib>

#define CUDA_CHECK(call)                                                     \
    do {                                                                     \
        cudaError_t err = (call);                                            \
        if (err != cudaSuccess) {                                            \
            std::fprintf(stderr, "CUDA error %s at %s:%d\n",                 \
                         cudaGetErrorString(err), __FILE__, __LINE__);       \
            std::exit(1);                                                    \
        }                                                                    \
    } while (0)

void run(float* host_data, int n) {
    float* device_data = nullptr;
    size_t bytes = static_cast<size_t>(n) * sizeof(float);
    CUDA_CHECK(cudaMalloc(&device_data, bytes));
    CUDA_CHECK(cudaMemcpy(device_data, host_data, bytes, cudaMemcpyHostToDevice));
    CUDA_CHECK(cudaFree(device_data));
}
