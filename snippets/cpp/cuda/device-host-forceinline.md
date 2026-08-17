---
lang: cpp
topic: cuda
tier: 2
tags: [cuda, device, host, forceinline]
note: A __host__ __device__ function compiles twice, once for the CPU path and once for the GPU path.
---
__host__ __device__ __forceinline__ float clampf(float x, float lo, float hi) {
    return x < lo ? lo : (x > hi ? hi : x);
}

__device__ float lerp(float a, float b, float t) {
    return a + t * (b - a);
}

__global__ void apply_clamp(float* data, int n, float lo, float hi) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) {
        data[i] = clampf(lerp(data[i], 0.0f, 0.1f), lo, hi);
    }
}
