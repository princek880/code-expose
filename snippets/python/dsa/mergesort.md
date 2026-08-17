---
lang: python
topic: dsa
tier: 2
tags: [mergesort, divide-conquer]
note: The <= in the merge comparison is what makes the sort stable.
---
def mergesort(xs):
    if len(xs) <= 1:
        return xs
    mid = len(xs) // 2
    left, right = mergesort(xs[:mid]), mergesort(xs[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    out.extend(left[i:])
    out.extend(right[j:])
    return out

print(mergesort([5, 2, 9, 1, 5, 6, 0]))
