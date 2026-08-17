---
lang: python
topic: dsa
tier: 3
tags: [backtracking, n-queens, pruning]
note: row - col and row + col identify the two diagonals, which makes each check O(1).
---
def n_queens(n):
    out, placement = [], []
    cols, diag, anti = set(), set(), set()

    def place(row):
        if row == n:
            out.append(placement[:])
            return
        for col in range(n):
            if col in cols or row - col in diag or row + col in anti:
                continue
            cols.add(col)
            diag.add(row - col)
            anti.add(row + col)
            placement.append(col)
            place(row + 1)
            placement.pop()
            cols.discard(col)
            diag.discard(row - col)
            anti.discard(row + col)

    place(0)
    return out

print(len(n_queens(6)), n_queens(4))
