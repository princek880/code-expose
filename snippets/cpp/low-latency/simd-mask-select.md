---
lang: cpp
topic: low-latency
tier: 4
tags: [simd, mask, select]
note: _mm_and_ps / _mm_andnot_ps combine a comparison mask with two operands to select without branching.
---
#include <xmmintrin.h>

void clamp_positive(float* data, int n) {
    __m128 zero = _mm_setzero_ps();
    int i = 0;
    for (; i + 4 <= n; i += 4) {
        __m128 v = _mm_loadu_ps(data + i);
        __m128 mask = _mm_cmpgt_ps(v, zero);
        __m128 result = _mm_or_ps(_mm_and_ps(mask, v), _mm_andnot_ps(mask, zero));
        _mm_storeu_ps(data + i, result);
    }
}

int demo() {
    float data[4] = {-1.0f, 2.0f, -3.0f, 4.0f};
    clamp_positive(data, 4);
    return static_cast<int>(data[0] + data[1] + data[2] + data[3]);
}
