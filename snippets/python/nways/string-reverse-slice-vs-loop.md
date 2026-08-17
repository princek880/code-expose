---
lang: python
topic: nways
tier: 1
tags: [nways, string-reverse, slice]
note: The [::-1] slice reverses in C at the interpreter level; the manual loop rebuilds the string one character at a time.
---
s = "hello world"

via_slice = s[::-1]
via_reversed_join = "".join(reversed(s))

manual = ""
for ch in s:
    manual = ch + manual

print(via_slice, via_slice == via_reversed_join == manual)
