---
lang: cpp
topic: cuda
tier: 2
tags: [cuda, cudaMalloc, cudaMemcpy]
note: cudaMemcpyHostToDevice and cudaMemcpyDeviceToHost are opposite directions; mixing them up corrupts silently.
---
#include <cstdio>
#include <cstdlib>

__global__ void scale(float* data, float factor, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) data[i] *= factor;
}

void run(float* host_data, int n) {
    float* device_data = nullptr;
    size_t bytes = static_cast<size_t>(n) * sizeof(float);

    cudaMalloc(&device_data, bytes);
    cudaMemcpy(device_data, host_data, bytes, cudaMemcpyHostToDevice);

    scale<<<(n + 255) / 256, 256>>>(device_data, 2.0f, n);

    cudaMemcpy(host_data, device_data, bytes, cudaMemcpyDeviceToHost);
    cudaFree(device_data);
}
