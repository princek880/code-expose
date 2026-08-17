---
lang: python
topic: core-syntax
tier: 2
tags: [slice, copy]
note: [:] copies the outer list only, so nested lists stay shared.
---
grid = [[1, 2], [3, 4]]
shallow = grid[:]
shallow[0][0] = 99
deep = [row[:] for row in grid]
deep[1][1] = -1
print(grid, shallow, deep)
