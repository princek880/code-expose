---
lang: python
topic: core-syntax
tier: 2
tags: [comprehension, nested]
note: Nested clauses read left to right, in the same order as the for statements they replace.
---
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
upper = [x for i, row in enumerate(matrix) for x in row[i + 1:]]
grid = {(r, c): matrix[r][c] for r in range(3) for c in range(3) if r != c}
