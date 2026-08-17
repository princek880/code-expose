---
lang: cpp
topic: nways
tier: 2
tags: [nways, matrix-multiply, naive]
note: The textbook i-j-k loop order strides down each column of B, which is the cache-unfriendly access pattern.
---
#include <vector>

using Mat = std::vector<std::vector<double>>;

Mat multiply_naive(const Mat& a, const Mat& b) {
    std::size_t n = a.size(), m = b[0].size(), k = b.size();
    Mat c(n, std::vector<double>(m, 0.0));
    for (std::size_t i = 0; i < n; ++i)
        for (std::size_t j = 0; j < m; ++j)
            for (std::size_t p = 0; p < k; ++p)
                c[i][j] += a[i][p] * b[p][j];
    return c;
}

int demo() {
    Mat a{{1, 2}, {3, 4}}, b{{5, 6}, {7, 8}};
    auto c = multiply_naive(a, b);
    return static_cast<int>(c[0][0] + c[1][1]);
}
