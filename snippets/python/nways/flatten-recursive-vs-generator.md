---
lang: python
topic: nways
tier: 2
tags: [nways, flatten, recursion]
note: The recursive version builds a list eagerly; the generator version streams and never holds it all at once.
---
def flatten_eager(xs):
    out = []
    for x in xs:
        if isinstance(x, list):
            out.extend(flatten_eager(x))
        else:
            out.append(x)
    return out

def flatten_lazy(xs):
    for x in xs:
        if isinstance(x, list):
            yield from flatten_lazy(x)
        else:
            yield x

nested = [1, [2, [3, 4], 5], [[6]]]
print(flatten_eager(nested), list(flatten_lazy(nested)))
