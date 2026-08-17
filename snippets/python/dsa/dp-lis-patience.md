---
lang: python
topic: dsa
tier: 3
tags: [dp, lis, patience, bisect]
note: tails[i] is the smallest tail of any increasing run of length i+1, so it stays sorted.
---
from bisect import bisect_left, bisect_right

def lis_len(xs):
    tails = []
    for x in xs:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)

def lnds_len(xs):
    tails = []
    for x in xs:
        i = bisect_right(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)

print(lis_len([10, 9, 2, 5, 3, 7, 101, 18]), lnds_len([1, 1, 2, 2, 3]))
