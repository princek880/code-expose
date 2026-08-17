---
lang: python
topic: nways
tier: 2
tags: [nways, random, secrets]
note: random is a Mersenne Twister and predictable from its output; secrets is the CSPRNG for anything sensitive.
---
import random
import secrets

fast_but_predictable = random.randint(1, 100)
secure_token = secrets.token_hex(8)
secure_choice = secrets.choice(["a", "b", "c"])
print(1 <= fast_but_predictable <= 100, len(secure_token), secure_choice in "abc")
