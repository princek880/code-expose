---
lang: python
topic: dsa
tier: 3
tags: [prefix-sum, 2d]
note: Inclusion-exclusion: add the two overlapping rectangles back once, subtract the corner twice.
---
def build_2d(grid):
    rows, cols = len(grid), len(grid[0])
    p = [[0] * (cols + 1) for _ in range(rows + 1)]
    for r in range(rows):
        for c in range(cols):
            p[r + 1][c + 1] = grid[r][c] + p[r][c + 1] + p[r + 1][c] - p[r][c]
    return p

def rect_sum(p, r1, c1, r2, c2):
    return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1]

grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
p = build_2d(grid)
print(rect_sum(p, 0, 0, 1, 1), rect_sum(p, 1, 1, 2, 2))
