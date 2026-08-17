---
lang: python
topic: nways
tier: 1
tags: [nways, deduplicate, set]
note: set(xs) drops order; dict.fromkeys keeps first-seen order because dicts remember insertion order.
---
xs = [3, 1, 2, 3, 1, 4, 2]
unordered = set(xs)
ordered = list(dict.fromkeys(xs))
sorted_unique = sorted(set(xs))
print(sorted(unordered) == sorted(list(unordered)), ordered, sorted_unique)
