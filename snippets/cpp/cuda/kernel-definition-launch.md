---
lang: cpp
topic: cuda
tier: 2
tags: [cuda, kernel, launch]
note: The <<<grid, block>>> syntax is CUDA's own extension; nvcc strips it before handing off to the host compiler.
---
__global__ void add_one(int* data, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        data[i] += 1;
    }
}

void launch(int* d_data, int n) {
    int threads = 256;
    int blocks = (n + threads - 1) / threads;
    add_one<<<blocks, threads>>>(d_data, n);
    cudaDeviceSynchronize();
}
