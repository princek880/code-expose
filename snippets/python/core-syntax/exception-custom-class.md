---
lang: python
topic: core-syntax
tier: 2
tags: [exceptions, class]
note: Carry structured fields on the exception; formatting is the handler's job.
---
class RetryLimit(Exception):
    def __init__(self, attempts, last):
        super().__init__(f"gave up after {attempts}")
        self.attempts = attempts
        self.last = last

try:
    raise RetryLimit(3, ValueError("boom"))
except RetryLimit as e:
    print(e.attempts, repr(e.last), str(e))
