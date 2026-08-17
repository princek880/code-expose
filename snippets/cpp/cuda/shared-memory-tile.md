---
lang: cpp
topic: cuda
tier: 3
tags: [cuda, shared-memory, syncthreads]
note: __syncthreads() must be reached by every thread in the block, so it cannot sit inside a divergent branch.
---
__global__ void tile_sum(const float* in, float* out, int n) {
    __shared__ float tile[256];
    int tid = threadIdx.x;
    int i = blockIdx.x * blockDim.x + tid;

    tile[tid] = (i < n) ? in[i] : 0.0f;
    __syncthreads();

    for (int stride = blockDim.x / 2; stride > 0; stride >>= 1) {
        if (tid < stride) {
            tile[tid] += tile[tid + stride];
        }
        __syncthreads();
    }

    if (tid == 0) {
        out[blockIdx.x] = tile[0];
    }
}
