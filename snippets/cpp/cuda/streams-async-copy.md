---
lang: cpp
topic: cuda
tier: 4
tags: [cuda, streams, async, overlap]
note: A stream orders its own operations but runs independently of other streams, which is how copy overlaps compute.
---
void run_overlapped(float* h_data, float* d_a, float* d_b, int n, int chunks) {
    cudaStream_t stream_a, stream_b;
    cudaStreamCreate(&stream_a);
    cudaStreamCreate(&stream_b);

    size_t chunk_bytes = static_cast<size_t>(n / chunks) * sizeof(float);
    int threads = 256;
    int blocks_per_chunk = (n / chunks + threads - 1) / threads;

    for (int c = 0; c < chunks; c += 2) {
        cudaMemcpyAsync(d_a, h_data, chunk_bytes, cudaMemcpyHostToDevice, stream_a);
        cudaMemcpyAsync(d_b, h_data, chunk_bytes, cudaMemcpyHostToDevice, stream_b);
    }

    cudaStreamSynchronize(stream_a);
    cudaStreamSynchronize(stream_b);
    cudaStreamDestroy(stream_a);
    cudaStreamDestroy(stream_b);
}
