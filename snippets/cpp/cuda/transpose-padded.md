---
lang: cpp
topic: cuda
tier: 4
tags: [cuda, transpose, bank-conflicts, padding]
note: Padding each row by one element shifts the column stride so it no longer aliases the same bank.
---
#define TILE 32

__global__ void transpose_padded(const float* in, float* out, int width, int height) {
    __shared__ float tile[TILE][TILE + 1];

    int x = blockIdx.x * TILE + threadIdx.x;
    int y = blockIdx.y * TILE + threadIdx.y;

    if (x < width && y < height) {
        tile[threadIdx.y][threadIdx.x] = in[y * width + x];
    }
    __syncthreads();

    int tx = blockIdx.y * TILE + threadIdx.x;
    int ty = blockIdx.x * TILE + threadIdx.y;

    if (tx < height && ty < width) {
        out[ty * height + tx] = tile[threadIdx.x][threadIdx.y];
    }
}
