---
lang: python
topic: dsa
tier: 2
tags: [two-pointers, sorted]
note: On sorted input the sum tells you which pointer to move, so no inner loop is needed.
---
def two_sum(xs, target):
    i, j = 0, len(xs) - 1
    while i < j:
        s = xs[i] + xs[j]
        if s == target:
            return i, j
        if s < target:
            i += 1
        else:
            j -= 1
    return None

def max_area(heights):
    i, j, best = 0, len(heights) - 1, 0
    while i < j:
        best = max(best, (j - i) * min(heights[i], heights[j]))
        if heights[i] < heights[j]:
            i += 1
        else:
            j -= 1
    return best

print(two_sum([1, 3, 4, 6, 9], 10), max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))
