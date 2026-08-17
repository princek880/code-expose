---
lang: python
topic: core-syntax
tier: 1
tags: [dict, merge, operator]
note: The right operand wins on conflict, for both | and the ** form.
---
base = {"host": "localhost", "port": 80, "tls": False}
override = {"port": 443, "tls": True}
merged = base | override
starred = {**base, **override, "debug": True}
base |= {"retries": 3}
print(merged["port"], starred["debug"], base["retries"])
