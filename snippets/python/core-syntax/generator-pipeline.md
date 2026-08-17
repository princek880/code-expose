---
lang: python
topic: core-syntax
tier: 3
tags: [generator, pipeline, lazy]
note: Chained generators stream: nothing is materialised between the stages.
---
def read(lines):
    for line in lines:
        yield line.strip()

def keep(rows, prefix):
    for row in rows:
        if row.startswith(prefix):
            yield row

def parse(rows):
    for row in rows:
        yield int(row.split(":")[-1])

raw = [" a:1 ", "b:2", " a:30", "a:4"]
print(sum(parse(keep(read(raw), "a"))))
