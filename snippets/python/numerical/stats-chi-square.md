---
lang: python
topic: numerical
tier: 3
tags: [statistics, chi-square, contingency]
note: Expected counts come from the row and column margins; degrees of freedom is (r-1)(c-1).
---
def chi_square(table):
    rows = [sum(r) for r in table]
    cols = [sum(c) for c in zip(*table)]
    total = sum(rows)
    stat = 0.0
    for i, row in enumerate(table):
        for j, observed in enumerate(row):
            expected = rows[i] * cols[j] / total
            stat += (observed - expected) ** 2 / expected
    df = (len(table) - 1) * (len(table[0]) - 1)
    return stat, df

table = [[30, 20, 10], [15, 25, 20]]
stat, df = chi_square(table)
print(round(stat, 4), df, stat > 5.99)
