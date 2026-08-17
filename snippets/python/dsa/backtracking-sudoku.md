---
lang: python
topic: dsa
tier: 4
tags: [backtracking, sudoku, constraint]
note: Return on the first blank cell: recursion handles the rest, so no outer progress state.
---
def legal(board, r, c, v):
    if any(board[r][x] == v for x in range(9)):
        return False
    if any(board[x][c] == v for x in range(9)):
        return False
    br, bc = 3 * (r // 3), 3 * (c // 3)
    return all(board[br + i][bc + j] != v for i in range(3) for j in range(3))

def solve(board):
    for r in range(9):
        for c in range(9):
            if board[r][c]:
                continue
            for v in range(1, 10):
                if legal(board, r, c, v):
                    board[r][c] = v
                    if solve(board):
                        return True
                    board[r][c] = 0
            return False
    return True

grid = [[0] * 9 for _ in range(9)]
print(solve(grid), grid[0])
