---
lang: cpp
topic: nways
tier: 4
tags: [nways, matrix-multiply, blocking, cache]
note: A block fits in cache, so each element loaded is reused block-many times before eviction, unlike the plain loop.
---
#include <vector>

using Mat = std::vector<std::vector<double>>;

Mat multiply_blocked(const Mat& a, const Mat& b, std::size_t block = 2) {
    std::size_t n = a.size(), m = b[0].size(), k = b.size();
    Mat c(n, std::vector<double>(m, 0.0));

    for (std::size_t ii = 0; ii < n; ii += block) {
        for (std::size_t jj = 0; jj < m; jj += block) {
            for (std::size_t pp = 0; pp < k; pp += block) {
                for (std::size_t i = ii; i < std::min(ii + block, n); ++i) {
                    for (std::size_t p = pp; p < std::min(pp + block, k); ++p) {
                        double aip = a[i][p];
                        for (std::size_t j = jj; j < std::min(jj + block, m); ++j) {
                            c[i][j] += aip * b[p][j];
                        }
                    }
                }
            }
        }
    }
    return c;
}

int demo() {
    Mat a{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    Mat b{{9, 8, 7}, {6, 5, 4}, {3, 2, 1}};
    auto c = multiply_blocked(a, b);
    return static_cast<int>(c[0][0] + c[2][2]);
}
