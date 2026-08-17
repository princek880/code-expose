---
lang: python
topic: dsa
tier: 2
tags: [greedy, intervals, merge]
note: Sorting by start means one pass suffices: either extend the last interval or open a new one.
---
def merge(intervals):
    out = []
    for start, end in sorted(intervals):
        if out and start <= out[-1][1]:
            out[-1][1] = max(out[-1][1], end)
        else:
            out.append([start, end])
    return out

def insert(intervals, new):
    return merge([list(iv) for iv in intervals] + [list(new)])

print(merge([(1, 3), (2, 6), (8, 10), (15, 18)]))
print(insert([(1, 3), (6, 9)], (2, 5)))
