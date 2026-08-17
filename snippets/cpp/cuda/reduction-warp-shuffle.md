---
lang: cpp
topic: cuda
tier: 4
tags: [cuda, reduction, warp-shuffle, intrinsics]
note: __shfl_down_sync exchanges registers directly between lanes, so the final warp needs no shared memory at all.
---
__inline__ __device__ float warp_reduce_sum(float val) {
    for (int offset = 16; offset > 0; offset >>= 1) {
        val += __shfl_down_sync(0xffffffff, val, offset);
    }
    return val;
}

__global__ void reduce_warp(const float* in, float* out, int n) {
    float sum = 0.0f;
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) sum = in[i];

    sum = warp_reduce_sum(sum);

    if (threadIdx.x % 32 == 0) {
        atomicAdd(out, sum);
    }
}
