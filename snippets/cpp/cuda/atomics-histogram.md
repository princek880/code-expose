---
lang: cpp
topic: cuda
tier: 3
tags: [cuda, atomics, histogram]
note: Every increment races with every other thread, which is exactly the case atomicAdd exists to make safe.
---
__global__ void histogram(const unsigned char* data, int n, int* bins) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        atomicAdd(&bins[data[i]], 1);
    }
}

__global__ void histogram_shared(const unsigned char* data, int n, int* bins, int num_bins) {
    extern __shared__ int local_bins[];
    for (int b = threadIdx.x; b < num_bins; b += blockDim.x) {
        local_bins[b] = 0;
    }
    __syncthreads();

    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        atomicAdd(&local_bins[data[i]], 1);
    }
    __syncthreads();

    for (int b = threadIdx.x; b < num_bins; b += blockDim.x) {
        atomicAdd(&bins[b], local_bins[b]);
    }
}
