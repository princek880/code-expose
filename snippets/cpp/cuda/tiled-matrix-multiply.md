---
lang: cpp
topic: cuda
tier: 4
tags: [cuda, matrix-multiply, tiling, shared-memory]
note: Tiling loads each element from global memory once per tile instead of once per output, which is the whole win.
---
#define TILE 16

__global__ void matmul_tiled(const float* A, const float* B, float* C, int n) {
    __shared__ float tileA[TILE][TILE];
    __shared__ float tileB[TILE][TILE];

    int row = blockIdx.y * TILE + threadIdx.y;
    int col = blockIdx.x * TILE + threadIdx.x;
    float acc = 0.0f;

    for (int t = 0; t < n / TILE; ++t) {
        tileA[threadIdx.y][threadIdx.x] = A[row * n + t * TILE + threadIdx.x];
        tileB[threadIdx.y][threadIdx.x] = B[(t * TILE + threadIdx.y) * n + col];
        __syncthreads();

        for (int k = 0; k < TILE; ++k) {
            acc += tileA[threadIdx.y][k] * tileB[k][threadIdx.x];
        }
        __syncthreads();
    }

    C[row * n + col] = acc;
}
