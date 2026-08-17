---
lang: python
topic: nways
tier: 1
tags: [nways, transpose, zip]
note: zip(*matrix) transposes in one call by pairing up the i-th element of every row.
---
matrix = [[1, 2, 3], [4, 5, 6]]

zipped = [list(row) for row in zip(*matrix)]

manual = [[0] * len(matrix) for _ in range(len(matrix[0]))]
for r in range(len(matrix)):
    for c in range(len(matrix[0])):
        manual[c][r] = matrix[r][c]

print(zipped == manual, zipped)
