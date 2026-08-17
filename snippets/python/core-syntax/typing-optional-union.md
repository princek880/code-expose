---
lang: python
topic: core-syntax
tier: 2
tags: [typing, optional, union]
note: X | None is the modern spelling of Optional[X]; both mean the same thing.
---
def head(xs: list[int]) -> int | None:
    return xs[0] if xs else None

def label(x: int | str | None = None) -> str:
    if x is None:
        return "none"
    return f"int:{x}" if isinstance(x, int) else f"str:{x}"

Row = tuple[str, int, float | None]
rows: list[Row] = [("a", 1, 0.5), ("b", 2, None)]
print(head([]), label(3), label("x"), rows[1][2])
