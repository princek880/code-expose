---
lang: cpp
topic: nways
tier: 3
tags: [nways, matrix-multiply, cache-optimization]
note: Swapping to i-k-j strides sequentially through both b's row and c's row, which is far more cache-friendly.
---
#include <vector>

using Mat = std::vector<std::vector<double>>;

Mat multiply_ikj(const Mat& a, const Mat& b) {
    std::size_t n = a.size(), m = b[0].size(), k = b.size();
    Mat c(n, std::vector<double>(m, 0.0));
    for (std::size_t i = 0; i < n; ++i) {
        for (std::size_t p = 0; p < k; ++p) {
            double aip = a[i][p];
            for (std::size_t j = 0; j < m; ++j) {
                c[i][j] += aip * b[p][j];
            }
        }
    }
    return c;
}

int demo() {
    Mat a{{1, 2}, {3, 4}}, b{{5, 6}, {7, 8}};
    auto c = multiply_ikj(a, b);
    return static_cast<int>(c[0][0] + c[1][1]);
}
