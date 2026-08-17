---
lang: python
topic: core-syntax
tier: 1
tags: [slice, reverse]
note: [::-1] copies; reversed() is a lazy iterator over the original.
---
s = "was it a car or a cat i saw"
print(s[::-1])
print(" ".join(w[::-1] for w in s.split()))
print(s.replace(" ", "")[::-1] == s.replace(" ", ""))
print(list(reversed(s.split()))[:3])
