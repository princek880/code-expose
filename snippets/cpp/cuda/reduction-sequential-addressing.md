---
lang: cpp
topic: cuda
tier: 4
tags: [cuda, reduction, sequential-addressing]
note: Sequential addressing halves the active-thread stride each round, which avoids the shared-memory bank conflicts of the naive version.
---
__global__ void reduce_sum(const float* in, float* out, int n) {
    extern __shared__ float sdata[];
    int tid = threadIdx.x;
    int i = blockIdx.x * blockDim.x * 2 + tid;

    sdata[tid] = (i < n ? in[i] : 0.0f) + (i + blockDim.x < n ? in[i + blockDim.x] : 0.0f);
    __syncthreads();

    for (unsigned int stride = blockDim.x / 2; stride > 0; stride >>= 1) {
        if (tid < stride) {
            sdata[tid] += sdata[tid + stride];
        }
        __syncthreads();
    }

    if (tid == 0) {
        out[blockIdx.x] = sdata[0];
    }
}
