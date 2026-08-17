---
lang: cpp
topic: cuda
tier: 2
tags: [cuda, indexing, 2d]
note: A 2D launch still flattens to one linear offset; row-major means width multiplies the row index.
---
__global__ void fill_grid(float* out, int width, int height) {
    int x = blockIdx.x * blockDim.x + threadIdx.x;
    int y = blockIdx.y * blockDim.y + threadIdx.y;
    if (x < width && y < height) {
        int idx = y * width + x;
        out[idx] = static_cast<float>(x + y);
    }
}

void launch(float* d_out, int width, int height) {
    dim3 block(16, 16);
    dim3 grid((width + block.x - 1) / block.x, (height + block.y - 1) / block.y);
    fill_grid<<<grid, block>>>(d_out, width, height);
}
