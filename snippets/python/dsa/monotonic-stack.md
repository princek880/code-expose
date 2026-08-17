---
lang: python
topic: dsa
tier: 3
tags: [monotonic-stack, next-greater]
note: Each index is pushed and popped once, so the nested while loop is still linear overall.
---
def next_greater(xs):
    out, stack = [-1] * len(xs), []
    for i, x in enumerate(xs):
        while stack and xs[stack[-1]] < x:
            out[stack.pop()] = x
        stack.append(i)
    return out

def largest_rectangle(heights):
    stack, best = [], 0
    for i, h in enumerate(heights + [0]):
        while stack and heights[stack[-1]] >= h:
            height = heights[stack.pop()]
            left = stack[-1] + 1 if stack else 0
            best = max(best, height * (i - left))
        stack.append(i)
    return best

print(next_greater([2, 1, 2, 4, 3]), largest_rectangle([2, 1, 5, 6, 2, 3]))
