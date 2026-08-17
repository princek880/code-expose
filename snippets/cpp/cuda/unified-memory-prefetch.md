---
lang: cpp
topic: cuda
tier: 3
tags: [cuda, unified-memory, prefetch]
note: cudaMallocManaged gives one pointer valid on both sides; prefetch hides the migration latency ahead of use.
---
__global__ void increment(int* data, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) data[i] += 1;
}

void run(int n) {
    int* data = nullptr;
    cudaMallocManaged(&data, static_cast<size_t>(n) * sizeof(int));

    int device = 0;
    cudaGetDevice(&device);
    cudaMemPrefetchAsync(data, static_cast<size_t>(n) * sizeof(int), device);

    increment<<<(n + 255) / 256, 256>>>(data, n);
    cudaDeviceSynchronize();

    cudaMemPrefetchAsync(data, static_cast<size_t>(n) * sizeof(int), cudaCpuDeviceId);
    cudaFree(data);
}
