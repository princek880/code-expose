---
lang: python
topic: nways
tier: 4
tags: [nways, fibonacci, matrix-exponentiation]
note: [[1,1],[1,0]]^n encodes two Fibonacci numbers at once, computable in O(log n) by repeated squaring.
---
def mat_mult(a, b):
    return [
        [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
        [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
    ]

def fib_matrix(n):
    result = [[1, 0], [0, 1]]
    base = [[1, 1], [1, 0]]
    while n:
        if n & 1:
            result = mat_mult(result, base)
        base = mat_mult(base, base)
        n >>= 1
    return result[0][1]

print([fib_matrix(n) for n in range(10)], fib_matrix(50))
