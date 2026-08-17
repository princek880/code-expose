---
lang: python
topic: numerical
tier: 3
tags: [statistics, t-test, welch]
note: Welch's test drops the equal-variance assumption, which is almost always the safer default.
---
import math

def welch_t(a, b):
    na, nb = len(a), len(b)
    ma, mb = sum(a) / na, sum(b) / nb
    va = sum((x - ma) ** 2 for x in a) / (na - 1)
    vb = sum((x - mb) ** 2 for x in b) / (nb - 1)
    se = math.sqrt(va / na + vb / nb)
    t = (ma - mb) / se
    df = se ** 4 / ((va / na) ** 2 / (na - 1) + (vb / nb) ** 2 / (nb - 1))
    return t, df

a = [5.1, 4.9, 5.6, 5.2, 4.8, 5.4]
b = [4.4, 4.1, 4.7, 4.3, 4.0]
t, df = welch_t(a, b)
print(round(t, 4), round(df, 3), abs(t) > 2)
