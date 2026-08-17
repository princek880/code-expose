---
lang: cpp
topic: cuda
tier: 3
tags: [cuda, events, timing]
note: cudaEventElapsedTime needs both events recorded and synchronized first, or the reading is undefined.
---
#include <cstdio>

float time_kernel_launch(void (*launch)()) {
    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    launch();
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms = 0.0f;
    cudaEventElapsedTime(&ms, start, stop);

    cudaEventDestroy(start);
    cudaEventDestroy(stop);
    return ms;
}
