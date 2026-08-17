---
lang: cpp
topic: low-latency
tier: 4
tags: [simd, intrinsics, sse]
note: _mm_loadu_ps tolerates unaligned addresses; _mm_load_ps demands 16-byte alignment or it faults.
---
#include <xmmintrin.h>

void add_arrays(const float* a, const float* b, float* out, int n) {
    int i = 0;
    for (; i + 4 <= n; i += 4) {
        __m128 va = _mm_loadu_ps(a + i);
        __m128 vb = _mm_loadu_ps(b + i);
        _mm_storeu_ps(out + i, _mm_add_ps(va, vb));
    }
    for (; i < n; ++i) out[i] = a[i] + b[i];
}

float horizontal_sum(__m128 v) {
    __m128 shuf = _mm_shuffle_ps(v, v, _MM_SHUFFLE(2, 3, 0, 1));
    __m128 sums = _mm_add_ps(v, shuf);
    shuf = _mm_movehl_ps(shuf, sums);
    sums = _mm_add_ss(sums, shuf);
    return _mm_cvtss_f32(sums);
}

int demo() {
    float a[6] = {1, 2, 3, 4, 5, 6};
    float b[6] = {1, 1, 1, 1, 1, 1};
    float out[6]{};
    add_arrays(a, b, out, 6);
    __m128 v = _mm_setr_ps(1, 2, 3, 4);
    return static_cast<int>(out[5]) + static_cast<int>(horizontal_sum(v));
}
