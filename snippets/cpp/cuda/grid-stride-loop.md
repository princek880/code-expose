---
lang: cpp
topic: cuda
tier: 3
tags: [cuda, grid-stride-loop]
note: A grid-stride loop lets one launch config handle any n, since each thread just wraps around the whole grid.
---
__global__ void saxpy_grid_stride(float a, const float* x, float* y, int n) {
    int stride = blockDim.x * gridDim.x;
    for (int i = blockIdx.x * blockDim.x + threadIdx.x; i < n; i += stride) {
        y[i] = a * x[i] + y[i];
    }
}

void launch(float a, const float* d_x, float* d_y, int n) {
    int threads = 256;
    int blocks = 128;
    saxpy_grid_stride<<<blocks, threads>>>(a, d_x, d_y, n);
}
