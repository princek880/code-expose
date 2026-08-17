---
lang: python
topic: functional-meta
tier: 2
tags: [functional, closure, nonlocal]
note: A closure captures the variable, not its value, which is why the late-binding loop trap exists.
---
def make_counter(start=0):
    count = start

    def bump(step=1):
        nonlocal count
        count += step
        return count

    return bump

c = make_counter(10)
print(c(), c(5), c.__closure__[0].cell_contents)

late = [lambda: i for i in range(3)]
early = [lambda i=i: i for i in range(3)]
print([f() for f in late], [f() for f in early])
