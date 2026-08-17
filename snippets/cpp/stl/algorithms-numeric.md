---
lang: cpp
topic: stl
tier: 2
tags: [stl, accumulate, inner-product]
note: accumulate's init argument sets the result type: pass 0.0, not 0, when summing doubles.
---
#include <numeric>
#include <vector>

double demo() {
    std::vector<double> v{1.5, 2.5, 3.0};
    std::vector<int> w{1, 2, 3};

    double total = std::accumulate(v.begin(), v.end(), 0.0);
    double product = std::accumulate(v.begin(), v.end(), 1.0, std::multiplies<>{});
    int dot = std::inner_product(w.begin(), w.end(), w.begin(), 0);

    std::vector<int> running(w.size());
    std::partial_sum(w.begin(), w.end(), running.begin());
    std::vector<int> diffs(w.size());
    std::adjacent_difference(w.begin(), w.end(), diffs.begin());

    return total + product + dot + running.back() + diffs.back();
}
